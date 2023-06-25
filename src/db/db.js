const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.MONGO_URI;

const connectMongoDB = async () => {
    console.log('Conectando ao banco de dados...');
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Conectado ao banco de dados com sucesso!');
    } catch (error) {
        console.log(`Error ao conectar ao banco de dados: ${error}`)
    }
}

module.exports = connectMongoDB;