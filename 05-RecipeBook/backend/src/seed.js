import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Recipe from "./models/Recipe.js";

dotenv.config();


import connectDB from "./config/db.js";
await connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Recipe.deleteMany();

    console.log("Existing data cleared");

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      {
        name: "Emma Laurent",
        email: "emma@example.com",
        password: hashedPassword
      },
      {
        name: "Luca Romano",
        email: "luca@example.com",
        password: hashedPassword
      },
      {
        name: "Aarav Patel",
        email: "aarav@example.com",
        password: hashedPassword
      }
    ]);

    console.log("Users seeded");

    // Create recipes
    const recipes = [
      {
        title: "Classic French Omelette",
        description:
          "A soft, buttery omelette with a delicate texture, made the traditional French way.",
        ingredients: [
          "Eggs",
          "Butter",
          "Salt",
          "White pepper"
        ],
        instructions:
          "Whisk eggs gently.\nMelt butter over low heat.\nStir continuously until just set.\nFold and serve immediately.",
        createdBy: users[0]._id
      },
      {
        title: "Roman Cacio e Pepe",
        description:
          "A minimalist Roman pasta dish built on technique and balance.",
        ingredients: [
          "Spaghetti",
          "Pecorino Romano",
          "Black pepper",
          "Salt"
        ],
        instructions:
          "Toast pepper.\nCook pasta.\nEmulsify cheese with pasta water.\nCombine off heat.",
        createdBy: users[1]._id
      },
      {
        title: "Masala Vegetable Pulao",
        description:
          "A fragrant one-pot rice dish with warming spices and vegetables.",
        ingredients: [
          "Basmati rice",
          "Mixed vegetables",
          "Whole spices",
          "Ghee",
          "Onion"
        ],
        instructions:
          "Sauté spices.\nAdd vegetables.\nAdd rice and water.\nCook until fluffy.",
        createdBy: users[2]._id
      },
      {
    title: "Garlic Butter Roasted Chicken",
    description:
      "Juicy oven-roasted chicken infused with garlic butter and herbs.",
    ingredients: [
      "Whole chicken",
      "Butter",
      "Garlic",
      "Rosemary",
      "Salt",
      "Black pepper"
    ],
    instructions:
      "Preheat oven.\nPrepare garlic butter.\nRub chicken thoroughly.\nRoast until golden and cooked through.",
    createdBy: users[0]._id
  },
  {
    title: "Creamy Tomato Basil Soup",
    description:
      "A comforting tomato soup finished with cream and fresh basil.",
    ingredients: [
      "Tomatoes",
      "Onion",
      "Garlic",
      "Vegetable stock",
      "Cream",
      "Fresh basil"
    ],
    instructions:
      "Sauté onion and garlic.\nAdd tomatoes and stock.\nSimmer gently.\nBlend smooth and finish with cream.",
    createdBy: users[1]._id
  },
  {
    title: "Spiced Chickpea Salad",
    description:
      "A bright, protein-rich salad with warm spices and citrus.",
    ingredients: [
      "Chickpeas",
      "Olive oil",
      "Cumin",
      "Paprika",
      "Lemon juice",
      "Parsley"
    ],
    instructions:
      "Roast chickpeas with spices.\nCool slightly.\nToss with lemon and herbs.\nServe fresh.",
    createdBy: users[2]._id
  }
    ];

    await Recipe.insertMany(recipes);
    console.log("Recipes seeded");

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedData();
