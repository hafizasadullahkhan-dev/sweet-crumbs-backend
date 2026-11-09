require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product");
const menu = require("../src/data/menu.json");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(menu);
    console.log(`✅ Seeded ${menu.length} products.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
})();