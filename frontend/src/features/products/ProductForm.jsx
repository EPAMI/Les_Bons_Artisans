// Formulaire en forme Modale qui permet d'ajouter un produit
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from './productsSlice';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const ProductForm = ({ productToEdit, onSave }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({
      ...product,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      dispatch(updateProduct({ ...product, id: productToEdit._id }));
    } else {
      dispatch(addProduct(product));
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="type"
        label="Type"
        value={product.type}
        onChange={handleChange}
        required
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={product.price}
        onChange={handleChange}
        required
      />
      <TextField
        name="rating"
        label="Rating"
        type="number"
        value={product.rating}
        onChange={handleChange}
        required
      />
      <TextField
        name="warranty_years"
        label="Warranty Years"
        type="number"
        value={product.warranty_years}
        onChange={handleChange}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={product.available}
            onChange={handleCheckboxChange}
            name="available"
          />
        }
        label="Available"
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProductForm;
