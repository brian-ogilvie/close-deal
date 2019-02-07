const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')
const saltRounds = 14

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5000/shopping_app_db', {
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

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
Product.belongsTo(User, {as: 'sold_by', foreignKey: 'user_id'})

User.hasMany(Review, {as: 'poster_of_reviews', onDelete: 'cascade', foreignKey: 'poster_id'})
Review.belongsTo(User, {as: 'poster', foreignKey: 'poster_id'})
User.hasMany(Review, {as: 'subject_of_reviews', onDelete: 'cascade', foreignKey: 'subject_id'})
Review.belongsTo(User, {as: 'subject', foreignKey: 'subject_id'})

User.hasMany(Transaction, {onDelete: 'cascade', foreignKey: 'buyer_id'})
Transaction.belongsTo(User, {foreignKey: 'buyer_id'})
User.hasMany(Transaction, {onDelete: 'cascade', foreignKey: 'seller_id'})
Transaction.belongsTo(User, {foreignKey: 'seller_id'})
Transaction.belongsToMany(Product, {through: 'purchased_products'})
Product.belongsToMany(Transaction, {through: 'purchased_products'})

module.exports = {db, Op, User, Product, Review, Transaction }