const Product = require('../models/Product');

// GET - Récupérer tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err); 
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET - Récupérer un produit par ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err); 
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// POST - Créer un nouveau produit
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err); 
    res.status(400).json({ message: err.message });
  }
};

// PUT - Mettre à jour un produit par ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err); 
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Supprimer un produit par ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err); 
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
