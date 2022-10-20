import express, { Request, Response } from 'express';
import morgan from "morgan";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import productsOrderRoutes from './handlers/products_order';


const app: express.Application = express();
const port=3000;

app.use(express.json());
//add logger middleware which logs data about the requests
app.use(morgan("commen"));

//add security middleware which deals with small security issues of express app
app.use(helmet());  

// middleware to rate limmiting calling the requests (decrease repeated request to specific no. or time)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many rquests for this API, try again after 15 minutes'
}));

app.get('/',  (req: Request, res: Response)=> {
    res.send('Hello World!')
});

//middleware to handle all errors throw the whole requests
app.use(errorMiddleware)

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);
productsOrderRoutes(app);

//start express server
app.listen(3000, function () {
    console.log(`starting app on: ${port}`)
});


export default app;





