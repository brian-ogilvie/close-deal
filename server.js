const express = require('express')
const PORT = process.env.PORT || 5000

const app = express()

const { User, Product, Review, Transaction } = require('./models')

app.get('/', (req, res) => {
  res.send('Welcome to the shopping app!')
})

app.get('/products', async(req,res) => {
	try{
		const products = await Product.findAll()
		res.json(products)
	} catch(e){
		res.status(500).json({message: e.message})
	}
})

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) throw Error('Product not found!')
    res.json(product)
  } catch(e) {
    res.status(500).json({message: e.message})
  }
})

app.post('/products', async (req, res) => {
  console.log(req.body)
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`)
})