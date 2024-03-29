import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Product from "./models/Product";
import Review from "./models/Review";

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('products');
    await db.dropCollection('users');
    await db.dropCollection('reviews');

  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2] = await User.create(
    {
      email: "superUser@gmail.com",
      password: "admin123",
      token: "adminToken",
      avatar: "fixtures/avatar.webp",
      role: "admin",
      displayName: "Dirty Billy",
    },
    {
      email: "user@mail.com",
      password: "admin123",
      token: "userToken",
      avatar: "fixtures/avatar-1.webp",
      role: "user",
      displayName: "Double wide Joe",
    }
  );

  const [cocktail1, cocktail2, cocktail3, cocktail4] = await Product.create(
    {
      user: user1,
      title: "Margarita",
      image: "fixtures/aperol.jpg",
      recipe: "boom bam and done",
      isPublished: true,
      ingredients: [
        { name: "gin", amount: "15ml" },
        { name: "vodka", amount: "150ml" },
      ],
    },
    {
      user: user1,
      title: "Dead eye",
      image: "fixtures/delish.jpg",
      recipe: "tap tap and grap",
      isPublished: false,
      ingredients: [
        { name: "pineapple juice", amount: "100ml" },
        { name: "vodka", amount: "50ml" },
      ],
    },
    {
      user: user2,
      title: "Snack bite",
      image: "fixtures/fresh-berry.jpg",
      recipe: "clap clap and you dead",
      isPublished: true,
      ingredients: [
        { name: "pickles", amount: "2 pieces" },
        { name: "vodka 60%", amount: "300ml" },
      ],
    },
    {
      user: user2,
      title: "Long Island",
      image: "fixtures/tequila.jpg",
      recipe: "Ice Ice little gin",
      isPublished: false,
      ingredients: [
        { name: "gin", amount: "50ml" },
        { name: "ice", amount: "3 pieces" },
      ],
    }
  );

  await Review.create(
  {
    userID: user1,
    productID: cocktail1._id,
    rate: 4
  },
  {
    userID: user1,
    productID: cocktail2._id,
    rate: 5
  },
  {
    userID: user2,
    productID: cocktail3._id,
    rate: 1
  },
  {
    userID: user1,
    productID: cocktail3._id,
    rate: 5
  },
  )

  await db.close();
}

run().catch(console.error);