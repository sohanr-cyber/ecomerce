import db from '@/database/connection'
import Product from '@/database/model/Product'
import { isAuth, isAdmin } from '@/utility'
import { getPrice } from '@/utility/helper'
import nextConnect from 'next-connect'
import slugify from 'slugify'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const product = await Product.findOne({ _id: req.query.id }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.disconnect()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.use(isAuth, isAdmin)
handler.put(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query
    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        slug: slugify(req.body.name),
        priceWithDiscount: getPrice(req.body.price, req.body.discount)
      },
      { new: true }
    )
    const upadated = await Product.findOne({ _id: req.query.id }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.disconnect()
    res.json(upadated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.delete(async (req, res) => {
  try {
    await db.connect()

    const { id } = req.query
    await Product.findByIdAndDelete(id)
    await db.disconnect()

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})
export default handler
