const { User, Product, Review, Transaction } = require('../models')

const seed = async () => {
  try {
    await User.truncate({cascade: true, restartIdentity: true})
    await Product.truncate({cascade:true, restartIdentity: true})
    await Transaction.truncate({cascade: true, restartIdentity:true})
    await Review.truncate({restartIdentity: true})

    console.log('🗂  database seed complete')
  } catch (e) {
    console.error('‼️ ', e.message)
  }
  process.exit()
}

seed()