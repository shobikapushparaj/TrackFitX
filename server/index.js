require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// const PORT = 4000;

app.use(cors());
app.use(express.json());

// connect to DB 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/exercise', exerciseRoutes);


app.get('/', (req, res) => {
  res.send('TrackFitx API is running...');
});
