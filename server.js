const express = require('express')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/', express.static('./build/'))

const { User, Product, Review, Transaction } = require('./models')

app.get('/', (req, res) => {
  res.send('Welcome to the shopping app!')
})

app.get('/products', async(req,res) => {
  try{
    const products = await Product.findAll({
      limit: 20,
      attributes: ['id','name','price','image_url', 'description', 'created_at','user_id'],
      include: [
        {model: User, as: 'sold_by', attributes: ['id'],
          include: [
            {model: Review, as: 'subject_of_reviews',
              attributes: ['stars']
            },
          ]
        }
      ],
    })
    res.json(products)
  } catch(e){
    res.status(500).json({message: e.message})
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ['id', 'name', 'price', 'description','image_url', 'created_at'],
      include: [
        {model: User, as: 'sold_by', attributes: ['id','first_name','last_name'], include: [
          {model: Review, as: 'subject_of_reviews', attributes: ['id', 'stars', 'comment', 'created_at'],
            include: [
              {model: User, as: 'poster', attributes: ['id','first_name', 'last_name']}
            ]
          }
        ]}
      ]
    })
    if (!product) throw Error('Product not found!')
    res.json(product)
  } catch(e) {
    res.status(500).json({message: e.message})
  }
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url
    };
    const product = await Product.update(updateProduct, { where: {id: id} })
    res.json(product)
  } catch(e) {
    console.error(e)
    res.status(500).json({message: e.message})
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Product.destroy({ where: {id: id} });
    res.sendStatus(204)
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});


app.post('/users/login', async (req, res) => {
  const invalidMsg = 'Invalid email or password'
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.status(400).json({user: null, loggedIn: false})
    }
    const {first_name, last_name, email, id, password: hash} = user
    const match = await bcrypt.compare(req.body.password, hash)
    if (!match) {
      return res.status(400).json({user: null, loggedIn: false})
    }
    const userToSend = {
      id: id,
      email: email,
      name: `${first_name} ${last_name}`
    }
    return res.json({user: userToSend, loggedIn: true})
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

app.post('/users/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (existingUser) {
      return res.json({message: 'A user with that email address already exists.'})
    }
    const newUser = await User.create(req.body)
    const {id, first_name, last_name, email} = newUser
    const response = {user: {id, first_name, last_name, email}}
    res.status(201).json(response)
  } catch(e) {
    res.status(500).json({message: e.message})
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Review, as: 'subject_of_reviews',
          include: [
            {
              model: User, as: 'poster',
              attributes: ['id','first_name','last_name']
            }
          ]
        },
        {
          model: Product
        }
      ],
    })
    res.json(user)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`)
})
