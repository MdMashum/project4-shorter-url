const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/route');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use((req, res, next) => {
    const error = new Error("Page Not Found !");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    return res.status(err.status).send({
        status: false,
        message: err.message
    });
})

mongoose.connect(process.env.MONGO_DB_CLUSTER).then(() => {
    console.log("MongoDb Connected !");
}).catch((error) => {
    console.log(error.message);
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on PORT ${process.env.PORT || 3000}`);
}); 








// REDIS_PORT=18385
// REDIS_URI=redis-18385.c8.us-east-1-4.ec2.cloud.redislabs.com
// REDIS_PASSWORD=2Ge5nNTkD46PY3jkRCXXIwnrO4zmbwoG


// REDIS_PORT=15244
// REDIS_URI=redis-15244.c80.us-east-1-2.ec2.cloud.redislabs.com
// REDIS_PASSWORD=Qg8AToq0CsFd2OjlRRqdMM1qVxJJOuIF