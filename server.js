const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.get('/', (req, res) => res.json({ message: 'test' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));