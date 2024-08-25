let BASE_URL, MONGODB_URI, GMAIL, PASSWORD, PIXEL_ID

// for development environement
if (process.env.NODE_ENV !== 'production') {
  BASE_URL = 'http://localhost:3000'
  MONGODB_URI = process.env.MONGODB_URI
  GMAIL = process.env.GMAIL_USER_DEV
  PASSWORD = process.env.GMAIL_PASS_DEV

  PIXEL_ID = '1040750500772753'
} else {
  BASE_URL = 'https://oraganic-food-mu.vercel.app'
  // BASE_URL = 'https://ecomerce-phi-gold.vercel.app'
  MONGODB_URI = process.env.MONGODB_URI
  MONGODB_URI = process.env.MONGODB_URI

  GMAIL = process.env.GMAIL_USER
  PASSWORD = process.env.GMAIL_PASS
  PIXEL_ID = '1040750500772753'
}

const APP_SECRET = process.env.APP_SECRET
export default BASE_URL
export { APP_SECRET, MONGODB_URI, GMAIL, PASSWORD, PIXEL_ID }
