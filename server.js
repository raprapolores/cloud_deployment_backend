const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const path = require('path');


dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://cloud-app-b4haceamhabcb2gt.canadacentral-01.azurewebsites.net'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.get('/api/auth', authRoutes);
app.get('/api/books', bookRoutes);

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
