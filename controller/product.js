const fs = require('fs');
const model = require('./model/productModel')
const Product = model.Product;
exports.createProducts = (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images
  });

  product.save()
    .then((prod) => {
      console.log(prod);
      res.status(201).json(prod);
    })
    .catch((error) => {
      console.error(error.message); // Log the error message
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
}

exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json(product);
}
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true })
    res.status(201).json(doc);
  } catch (err) {
    res.status(401).json(err);
  }

}
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(201).json(doc)
  } catch (err) {
    res.status(401).json(err)
  }
}
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc)
  } catch(err){
    res.status(401).json(err)
  }

    
  // const productIndex = products.findIndex(p => p.id === id);
  // const singleProduct = products[productIndex];
  // products.splice(productIndex, 1);
  // res.status(201).json('Product delete :' + singleProduct);
}