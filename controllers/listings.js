const Listing = require("../models/listings.js");
const maptilerClient = require("@maptiler/client");
const { config, geocoding } = require("@maptiler/client");

config.apiKey = process.env.MAP_TOKEN;

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
        populate: {
            path:"author"    //nested populate
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
}

module.exports.createListing = async (req, res) => {
    let response = await geocoding.forward(req.body.listing.location, {
    limit: 2
  });

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

    newListing.geometry = response.features[0].geometry;

    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_350");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing = async (req,res) => {
    if(!req.body.listing){
        throw new ExpressError(404,"Send valid data for listing")
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}

module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  
  //Filters
  const targetCategory = category.replace(/-/g, " ").trim().toLowerCase();

  const allListings = await Listing.find({});
  const filteredListings = allListings.filter((listing) => {
    return (listing.category || "").trim().toLowerCase() === targetCategory;
  });

  if (filteredListings.length === 0) {
    req.flash("error", `No listings found for category: ${category.replace(/-/g, " ")}`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { 
    allListings: filteredListings,
    searchQuery: "",
    selectedCategory: category 
  });
};

//SEARCH FUNCTION
module.exports.index = async (req, res) => {
  const { q } = req.query;
  let allListings = await Listing.find({});

  // If a search query is provided, filter the array using plain JavaScript
  if (q && q.trim() !== "") {
    const searchTerm = q.trim().toLowerCase();

    allListings = allListings.filter((listing) => {
      const title = (listing.title || "").toLowerCase();
      const location = (listing.location || "").toLowerCase();
      const country = (listing.country || "").toLowerCase();

      return (
        title.includes(searchTerm) ||
        location.includes(searchTerm) ||
        country.includes(searchTerm)
      );
    });
  }

  // Pass allListings and searchQuery to the view
  res.render("listings/index.ejs", { allListings, searchQuery: q });
};