// seed.js
const mongoose = require("mongoose");
const Seva = require("./models/Seva");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("DB connected");

  await Seva.deleteMany(); // optional: clean slate

  const dummySevas = [
    {
      id: 1,
      code: "SEVA001",
      title: "Abhishekam",
      tags: ["puja", "temple"],
      description: "A sacred Abhishekam ritual",
      marketPrice: 500,
      discountedPrice: 400,
      start: new Date(),
      end: new Date(),
      amountRaised: 1500,
      targetAmount: 5000,
      media: "https://example.com/abhishekam.jpg",
    },
    {
      id: 2,
      code: "SEVA002",
      title: "Annadanam",
      tags: ["charity", "food"],
      description: "Feeding the poor",
      marketPrice: 1000,
      discountedPrice: 800,
      start: new Date(),
      end: new Date(),
      amountRaised: 2000,
      targetAmount: 10000,
      media: "https://example.com/annadanam.jpg",
    },
    {
      id: 3,
      code: "SEVA003",
      title: "Yagna",
      tags: ["spiritual", "yoga"],
      description: "Yagna description goes here.",
      marketPrice: 742,
      discountedPrice: 577,
      start: "2025-05-11T19:34:29.871Z",
      end: "2025-05-21T19:34:29.871Z",
      amountRaised: 4357,
      targetAmount: 8133,
      media: "https://example.com/seva3.jpg",
    },
    {
      id: 4,
      code: "SEVA004",
      title: "Prasad Distribution",
      tags: ["charity", "health"],
      description: "Prasad Distribution description goes here.",
      marketPrice: 673,
      discountedPrice: 700,
      start: "2025-05-11T19:34:29.871Z",
      end: "2025-05-23T19:34:29.871Z",
      amountRaised: 2933,
      targetAmount: 8684,
      media: "https://example.com/seva4.jpg",
    },
    {
      id: 5,
      code: "SEVA005",
      title: "Bhandara",
      tags: ["education"],
      description: "Bhandara description goes here.",
      marketPrice: 839,
      discountedPrice: 732,
      start: "2025-05-10T19:34:29.871Z",
      end: "2025-05-21T19:34:29.871Z",
      amountRaised: 2031,
      targetAmount: 7291,
      media: "https://example.com/seva5.jpg",
    },
    {
      id: 6,
      code: "SEVA006",
      title: "Bhandara",
      tags: ["education"],
      description: "Bhandara description goes here.",
      marketPrice: 999,
      discountedPrice: 859,
      start: "2025-06-10T19:34:29.871Z",
      end: "2025-06-21T19:34:29.871Z",
      amountRaised: 2099,
      targetAmount: 7299,
      media: "https://example.com/seva6.jpg",
    },
  ];

  await Seva.insertMany(dummySevas);
  console.log("✅ Sevas seeded successfully");
  process.exit();
});
