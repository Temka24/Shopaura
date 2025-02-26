import mongoose from 'mongoose';
import Product from '@/model/ProductModel';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

// Global cache ашиглах
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new connection');
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log('Database connected successfully');
    return cached.conn;
  } catch (error) {
    console.error('Database connection failed:', error);
    cached.promise = null; // Reset promise if connection fails
    throw error;
  }
}

// Global cache хадгалах
global.mongooseCache = cached;

export default connectToDatabase;
