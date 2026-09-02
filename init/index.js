const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const MONGO_URL = process.env.ATLASDB_URL; 

main()
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner : "6a95915634778a1e9b276e31"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")
}

initDB ();