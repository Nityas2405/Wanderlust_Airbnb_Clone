const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"])

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Listing = require("../models/listings.js"); // Adjust path if needed
const { config, geocoding } = require("@maptiler/client");

// Configure MapTiler API Key
config.apiKey = process.env.MAP_TOKEN;

// Connect to MongoDB
const MONGO_URL = process.env.ATLASDB_URL; // Replace with your DB URL
mongoose.connect(MONGO_URL);

async function updateExistingListings() {
  try {
    // 1. Find all listings that don't have geometry set
    const listings = await Listing.find({
      $or: [{ geometry: { $exists: false } }, { geometry: null }]
    });

    console.log(`Found ${listings.length} listings needing coordinates...`);

    // 2. Loop through each listing and geocode its location
    for (let listing of listings) {
      const searchLocation = `${listing.location}, ${listing.country}`;

      let response = await geocoding.forward(searchLocation, { limit: 1 });

      if (response.features && response.features.length > 0) {
        listing.geometry = response.features[0].geometry;
      } else {
        // Fallback coordinates if location string isn't found
        listing.geometry = {
          type: "Point",
          coordinates: [77.2090, 28.6139]
        };
      }

      await listing.save();
      console.log(`Updated: "${listing.title}" -> ${listing.location}`);
    }

    console.log("✅ All existing listings updated successfully!");
  } catch (err) {
    console.error("Error updating listings:", err);
  } finally {
    mongoose.connection.close();
  }
}

updateExistingListings();