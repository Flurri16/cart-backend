import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

//Constants
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

async function start() {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u5sgw90.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
      app.listen(PORT, () => console.log(`Started on PORT:`, PORT));
    } catch (err) {
      console.log(err);
    }
  }
start();
