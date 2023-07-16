import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import cors from 'cors';
// import './middleware/jwt.middleware';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": "*",
}));

app.set('port', process.env.PORT || 8080);

app.use(routes);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        message: err.message,
    });
});

export default app;
