const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const path = require('path');


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch((err) => console.error(err));


app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
