//configuration de la base de données

const { MongoClient } = require('mongodb');

// URL de connexion à MongoDB
const uri = 'mongodb+srv://naouelepaminondas:L6qkxhh174sNhckE@clusternaouel1.o6txnwk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNaouel1';

// Création d'un client MongoDB
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    // Connexion au serveur MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    await client.close();
  }
}

module.exports = connectToMongoDB;
