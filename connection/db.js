const mongoose = require("mongoose");

// Mongo Atlas
// mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,
// useUnifiedTopology: true});

// local
mongoose.connect(process.env.DATABASE_URL)