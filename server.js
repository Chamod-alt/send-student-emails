const express = require('express');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json
app.use('/register', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
