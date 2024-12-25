const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
console.log('MongoDB Link:', process.env.MONGODB_LINK);
mongoose.set("strictQuery", false);


app.use(express.json());
app.use(cors());


// Подключение маршрутов
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readingListRoutes = require('./routes/readingListRoutes')
const paymentRoutes = require('./routes/paymentRoutes');

// Использование маршрутов
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/readingList', readingListRoutes)
app.use('/api/payment', paymentRoutes);


app.get('/', (req, res) => {
    res.send('Book Library App is running ...');
});


mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

