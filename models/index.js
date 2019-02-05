const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')
const saltRounds = 14

const db = new Sequelize({
  database: 'shopping_app_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
})

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { hooks: {
  afterValidate: async (user, options) => {
    user.password = await bcrypt.hash(user.password, saltRounds)
  },
}})

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.REAL,
    allowNull: false,
  },
  image_url: Sequelize.STRING,
  num_available: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
})

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  },
  comment: Sequelize.TEXT,
})

const Transaction = db.define('transaction')

User.hasMany(Product, {onDelete: 'cascade'})
Product.belongsTo(User)
User.hasMany(Review, {onDelete: 'cascade', foreignKey: 'poster_id'})
Review.belongsTo(User, {foreignKey: 'poster_id'})
User.hasMany(Review, {onDelete: 'cascade', foreignKey: 'subject_id'})
Review.belongsTo(User, {foreignKey: 'subject_id'})
User.hasMany(Transaction, {onDelete: 'cascade', foreignKey: 'buyer_id'})
Transaction.belongsTo(User, {foreignKey: 'buyer_id'})
User.hasMany(Transaction, {onDelete: 'cascade', foreignKey: 'seller_id'})
Transaction.belongsTo(User, {foreignKey: 'seller_id'})
Transaction.belongsToMany(Product, {through: 'purchased_products'})
Product.belongsToMany(Transaction, {through: 'purchased_products'})

module.exports = {db, Op, User, Product, Review, Transaction}