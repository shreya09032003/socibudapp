import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

dotenv.config();

const uri = process.env.MONGO_URL;

const seedDatabase = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared');

    await User.insertMany(users);
    console.log('Users inserted successfully');

    await Post.insertMany(posts);
    console.log('Posts inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
