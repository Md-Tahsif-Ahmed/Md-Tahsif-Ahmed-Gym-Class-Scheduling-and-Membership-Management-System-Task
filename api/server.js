const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../database/conection');
const userRoutes = require('../routes/userRoutes');
const classRoutes = require('../routes/classRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use('/api/users', userRoutes);
app.use('/api', classRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
