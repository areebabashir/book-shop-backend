import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      author: {
       
          type: String,
          required: true
      
      },
      ISBN: {
        type: String,
        unique: true
      },
      category: String,
      publisher: {
        name: String,
        address: String
      },
      price: {
        type: Number,
        required: true
      },
      stock: {
        type: Number,
        required: true
      },
      stockThreshold: {
        type: Number,
        default: 5 // Default stock threshold for alerts
      },
      image: String, // URL to the image
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    });

export default mongoose.model('Book', BookSchema);
