require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const pokemonsRouter = require('./routes/pokemonsRouter');

const { PORT, DATABASE, ORIGIN, METHODS, HEADERS, IS_CREDENTIALS } =
  process.env;

const app = express();

// Parse JSON requests
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Database connection
// mongoose
//   .connect(DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('🚀 Database connected successfully!'))
//   .catch(console.log);

// Enable CORS
app.use(
  cors({
    origin: ORIGIN,
    methods: METHODS.split(','),
    allowedHeaders: HEADERS.split(','),
    credentials: Boolean(IS_CREDENTIALS),
  }),
);

// Routes
app.use('/auth', authRouter);
app.use('/', pokemonsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
