require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routers/users.js');
const doctorRoutes = require('./routers/doctors.js');
const googleRoutes = require('./routers/googleauth.js');
const apointmentsRouters = require('./routers/appointments.js');
const discussionRoutes = require('./routers/discussionRoutes');
const commentRoutes = require('./routers/commentRoutes');
const likeRoutes = require('./routers/likeRoutes');
const middlerwareLogs = require('./middleware/logs.js');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(middlerwareLogs.logger);
app.use(errorHandler);
app.use(express.json());
app.use(cors());

// google auth endpoint
app.use('/auth/google', googleRoutes);

// users endpoint
app.use('/users', userRoutes);

//doctors endpoint
app.use('/doctors', doctorRoutes);

// apointments enpoint
app.use('/appointments', apointmentsRouters);

// forum diskusi endpoint
app.use('/api/discussions', discussionRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Server berhasil berjalan di port ${port}!`);
});