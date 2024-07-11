// Sert a l'affichage des produits
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from './productsSlice';
import { Button, Typography, CircularProgress, Grid, Box } from '@mui/material';

const ProductsList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  let content;

  if (productStatus === 'loading') {
    content = <CircularProgress />;
  } else if (productStatus === 'succeeded') {
    content = (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Box boxShadow={2} p={2} borderRadius={4} bgcolor="white">
              <Typography variant="h6" gutterBottom>{product.name}</Typography>
              <Typography variant="body1" gutterBottom><strong>Price:</strong> ${product.price}</Typography>
              <Typography variant="body2" gutterBottom><strong>Rating:</strong> {product.rating}/5</Typography>
              <Typography variant="body2" gutterBottom><strong>Available:</strong> {product.available ? 'Yes' : 'No'}</Typography>
              <Typography variant="body2" gutterBottom><strong>Type:</strong> {product.type}</Typography>
              <Typography variant="body2" gutterBottom><strong>Warranty:</strong> {product.warranty_years} years</Typography>
              <Button variant="outlined" color="primary" onClick={() => onEdit(product)}>Edit</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(product._id)}>Delete</Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  } else if (productStatus === 'failed') {
    content = <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {content}
    </div>
  );
};

export default ProductsList;
