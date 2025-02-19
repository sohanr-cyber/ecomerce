import db from '@/database/connection'
import Category from '@/database/model/Category'
import Product from '@/database/model/Product'
import nc from 'next-connect'
// import { ExtractColors, getPlaceholderImage } from '@/utility/image'

const handler = nc()

const fetchLatestProducts = async () => {
  let latestProducts = await Product.find({})
    .sort({ createdAt: -1 }).populate('categories', 'name')
    .limit(4).lean()

  

  return latestProducts
}



const fetchFeaturedProducts = async () => {
  let featuredProducts = await Product.find({ featured: true })
    .sort({ createdAt: -1 }).populate('categories', 'name')
    .limit(4).lean()
 

  return featuredProducts
}
const fetchTopSellingProducts = async () => {
  let topSellingProducts = await Product.find({})
    .sort({ sold: -1 }).populate('categories', 'name')
    .limit(4).lean()


  return topSellingProducts
}


const fetchFeaturedCategories = async lang => {
  const categories = await Category.find({ isFeatured: true }).sort({
    updatedAt: -1
  })
  return Promise.all(
    categories.map(async category => {
      let products = await Product.find({
        categories: { $in: category._id },

      })
        .sort({ publishedAt: -1 })
        .populate('categories', 'name')
        .limit(10).lean()

      const subCategories = await Category.find({
        parent: category._id
      }).select('_id name').lean()

      return {
        category: category.name,
        _id: category._id,
        subCategories,
        updatedAt: category.updatedAt,
        products
      }
    })
  )
}

handler.get(async (req, res) => {
  try {
    await db.connect()

    const [featuredCategories, latest, topSelling, featured] =
      await Promise.all([
        fetchFeaturedCategories(),
        fetchLatestProducts(),
        fetchTopSellingProducts(),
        fetchFeaturedProducts(),
      ])


    await db.disconnect()
    return res
      .status(200)
      .json([
        ...featuredCategories,
        { category: "Recommended", products: featured },
        { category: "Top Selling", products: topSelling },
        { category: "New Arival", products: latest },
      ])
  } catch (error) {
    console.error('Error fetching featured categories:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default handler
