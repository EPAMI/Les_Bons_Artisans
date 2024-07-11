// app.js (ou server.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);

// Connexion à MongoDB
const uri = 'mongodb+srv://naouelepaminondas:L6qkxhh174sNhckE@clusternaouel1.o6txnwk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNaouel1'; // Remplacez par votre URI de connexion MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Démarrer le serveur
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
