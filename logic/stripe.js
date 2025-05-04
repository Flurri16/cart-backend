import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req, res) => {
  try {
    const cartItems = req.body.cartItems

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: item.title,
          images: [`http://localhost:5000/${item.imgUrl}`]
        },
        unit_amount: item.cost * 100
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
