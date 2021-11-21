require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}


app.use(cors(corsOptions))

app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));





// Serve static assests in production
app.use("/", express.static("public/frontend"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public", "frontend", "index.html"))
);




app.listen(port, console.log(`Listening on port ${port}.`));