import React, { useState } from 'react';
import ProductsList from './features/products/ProductsList';
import ProductForm from './features/products/ProductForm';
import {Container,Button,Modal,Box} from '@mui/material';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    handleOpenModal();
  };

  return (
    <Container>
      <Button onClick={handleOpenModal}>Add Product</Button>
      <ProductsList onEdit={handleEdit} />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box p={3}>
          <ProductForm productToEdit={productToEdit} onSave={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
