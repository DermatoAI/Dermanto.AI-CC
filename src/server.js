require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routers/users.js');
const googleRoutes = require('./routers/googleauth.js');
const middlerwareLogs = require('./middleware/logs.js');

const app = express();

app.use(middlerwareLogs.logger);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use(cors());

// google auth endpoint
app.use('/auth/google', googleRoutes);

// users endpoint
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Server berhasil berjalan di port ${port}!`);
});