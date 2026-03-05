const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not provided");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared old data to apply schema updates...");

    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log("Database already seeded. Skipping...");
      process.exit(0);
    }

    // Categories
    const categories = await Category.insertMany([
      { name: "Electronics", slug: "electronics" },
      { name: "Clothing", slug: "clothing" },
      { name: "Home & Kitchen", slug: "home-kitchen" },
      { name: "Fitness", slug: "fitness" },
      { name: "Accessories", slug: "accessories" }
    ]);

    const [electronics, clothing, home, fitness, accessories] = categories;

    await Product.insertMany([

      // ================= ELECTRONICS =================
      {
        name: "Bluetooth Speaker",
        price: 3500,
        category: electronics._id,
        image: "/images/products/bluetooth-speaker.jpg"
      },
      {
        name: "Gaming Mouse",
        price: 2500,
        category: electronics._id,
        image: "/images/products/gaming-mouse.jpg"
      },
      {
        name: "Mechanical Keyboard",
        price: 6500,
        category: electronics._id,
        image: "/images/products/mechanical-keyboard.jpg"
      },
      {
        name: "Headphones",
        price: 4000,
        category: electronics._id,
        image: "/images/products/headphones.jpg"
      },
      {
        name: "Smart Watch",
        price: 12000,
        category: electronics._id,
        image: "/images/products/smart-watch.webp"
      },

      // ================= CLOTHING =================
      {
        name: "Cotton T-Shirt",
        price: 800,
        category: clothing._id,
        image: "/images/products/cotton-tshirt.webp"
      },
      {
        name: "Denim Jeans",
        price: 2200,
        category: clothing._id,
        image: "/images/products/denim-jeans.webp"
      },
      {
        name: "Hoodie Sweatshirt",
        price: 1800,
        category: clothing._id,
        image: "/images/products/hooded-sweatshirt.webp"
      },
      {
        name: "Casual Shirt",
        price: 1500,
        category: clothing._id,
        image: "/images/products/casual-shirt.jpg"
      },
      {
        name: "Track Pants",
        price: 1200,
        category: clothing._id,
        image: "/images/products/track-pants.webp"
      },

      // ================= HOME & KITCHEN =================
      {
        name: "Air Fryer",
        price: 7000,
        category: home._id,
        image: "/images/products/air-fryer.webp"
      },
      {
        name: "Coffee Maker",
        price: 5500,
        category: home._id,
        image: "/images/products/coffee-maker.webp"
      },
      {
        name: "Electric Kettle",
        price: 1800,
        category: home._id,
        image: "/images/products/electric-kettle.avif"
      },
      {
        name: "Cookware Set",
        price: 9000,
        category: home._id,
        image: "/images/products/cookware-Set.webp"
      },
      {
        name: "Storage Containers Set",
        price: 2500,
        category: home._id,
        image: "/images/products/storage-containers-set.avif"
      },

      // ================= FITNESS =================
      {
        name: "Adjustable Dumbbells",
        price: 12000,
        category: fitness._id,
        image: "/images/products/adjustable-dumbbells.webp"
      },
      {
        name: "Yoga Mat",
        price: 800,
        category: fitness._id,
        image: "/images/products/yoga-mat.jpg"
      },
      {
        name: "Skipping Rope",
        price: 300,
        category: fitness._id,
        image: "/images/products/skipping-rope.webp"
      },
      {
        name: "Resistance Bands",
        price: 700,
        category: fitness._id,
        image: "/images/products/resistance-bands.jpg"
      },
      {
        name: "Protein Shaker Bottle",
        price: 400,
        category: fitness._id,
        image: "/images/products/protein-shaker-bottle.avif"
      },

      // ================= ACCESSORIES =================
      {
        name: "Leather Belt",
        price: 900,
        category: accessories._id,
        image: "/images/products/leather-belt.webp"
      },
      {
        name: "Wallet",
        price: 1200,
        category: accessories._id,
        image: "/images/products/wallet.avif"
      },
      {
        name: "Sunglasses",
        price: 1500,
        category: accessories._id,
        image: "/images/products/sunglasses.jpg"
      },
      {
        name: "Formal Leather Shoes",
        price: 3500,
        category: accessories._id,
        image: "/images/products/formal-leather-shoes.jpg"
      },
      {
        name: "Sports Sandals",
        price: 2000,
        category: accessories._id,
        image: "/images/products/sports-sandals.jpg"
      }

    ]);

    console.log("Products seeded successfully");
    process.exit(0);

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
