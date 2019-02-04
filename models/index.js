const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
})

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
User.hasMany(Review, {onDelete: 'cascade'})
Review.belongsTo(User)
Product.hasMany(Review, {onDelete: 'cascade'})
Review.belongsTo(Product)
User.hasMany(Transaction, {onDelete: 'cascade'})
Transaction.belongsTo(User)
Transaction.belongsToMany(Product, {through: 'purchased_products'})
Product.belongsToMany(Transaction, {through: 'purchased_products'})

module.exports = {db, Op, User, Product, Review, Transaction}