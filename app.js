const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//router
const categoriesRouter = require('./app/api/v1/categories/router') //import the router
const talentsRouter = require('./app/api/v1/talents/router') //import the router
const imagesRouter = require('./app/api/v1/images/router') //import the router
const eventsRouter = require('./app/api/v1/events/router') //import the router
const organizerRouter = require('./app/api/v1/Organizer/router') //import the router
const authCMSRouter = require('./app/api/v1/auth/router') //import the router
const orderRouter = require('./app/api/v1/order/router') //import the router
const participantsRouter = require('./app/api/v1/participants/router') //import the router
const paymentsRouter = require('./app/api/v1/payments/router') //import the router
const ticketsCategoriesRouter = require('./app/api/v1/Ticket Categories/router') //import the router

const v1 = '/api/v1';



// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'welcome to api semina',
    });
});

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizerRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, orderRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(`${v1}/cms`, ticketsCategoriesRouter);
app.use(`${v1}`, participantsRouter);


// middlewares //this must in the bellow of router code so not return error
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);



module.exports = app;