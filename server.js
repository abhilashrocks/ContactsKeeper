const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path')


connectDB();


// app.get('/', (req, res) => res.json({ msg: 'test' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static['client/build']);
    app / get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;



app.use(express.json({ extended: false }));
