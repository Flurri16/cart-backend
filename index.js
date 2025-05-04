import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { createCheckoutSession } from './logic/stripe.js'


import { getMe, login, register} from './logic/auth.js'
import {checkAuth} from './logic/checkAutj.js'
import { upload } from './logic/multerLogic.js' // Путь исправь, где у тебя лежит upload.js
import { addItem, getAll, getOne, remove } from './logic/item.js'
import { tgsent } from './logic/telegram.js'



const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


//Constants
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//API
app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.get('/api/auth/me',checkAuth, getMe)
app.post('/api/add', upload.single('image'), addItem)
app.get('/api/items/', getAll)
app.delete('/api/items/delete/:id', remove)
app.get('/api/items/:id', getOne)
app.use('/api/telegram', tgsent)

app.post('/api/create-checkout-session', createCheckoutSession)
async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u5sgw90.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
    app.listen(PORT, () => console.log(`Started on PORT:`, PORT));
  } catch (err) {
    console.log(err);
    }
  }
start();
