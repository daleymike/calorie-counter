const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoutes = require('./routes/authorization.routes');
require('./config/mongoose.config');
require('./routes/test.routes')(app);
app.use(authRoutes);



app.listen(8000, () => console.log("Listening on port 8000"));