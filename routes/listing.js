const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconflict.js"); //file to be uploaded on cloud storage
const upload = multer({ storage});   

//Index Route and create route
router
.route("/")
.get(wrapAsync (listingController.index))
.post(isLoggedIn,
    validateListing,
    upload.single('listing[image][url]'),
    wrapAsync(listingController.createListing));


//New route
router.get("/new",isLoggedIn, listingController.renderNewForm)

//filter route
router.get("/filter/:category", wrapAsync(listingController.filterByCategory));

//Show,edit,update and delete route
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.editListing))

module.exports = router;