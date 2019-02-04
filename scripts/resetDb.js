const { db } = require('../models')

const reset = async () => {
  try {
    await db.sync({force: true})
    console.log('🗄  database reset complete')
  } catch (e) {
    console.error('‼️ ', e.message)
  }
  process.exit()
}

reset()