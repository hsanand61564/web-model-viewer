import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import routes from '../routes';
import { ResponseError, Result } from '../models/index';
import { BentleyCloudRpcManager } from "@bentley/imodeljs-common";
import { getRpcInterfaces } from '../imodel-web/backend';
import { ServerApp } from '../app';
import cors from 'cors';

export default ({ app }: { app: express.Application }) => {

    app.get('/health', (req: Request, res: Response) => {
        const result: Result<any> = new Result<any>(false);
        let status = 200;
        if (ServerApp.isRunning) {
            result.message = "Yes the server is in Running State";
        } else {
            status = 300;
            result.message = "The server is in Stopped State";
        }
        res.status(status).json(result).end();
    });
    app.head('/health', (req: Request, res: Response) => {
        res.status(200).end();
    });

    app.use(express.static('client'));

    app.enable('trust proxy');

    // app.get('/', (req: Request, res: Response) => {
    //     res.sendFile('index.html');
    // });

    // Enable Cross Origin Resource Sharing to all origins by default
    //app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.text({ limit: "1000mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    // Load API routes
    app.use('/api', routes());

    // imodel backend start
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "Accept, Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Correlation-Id, X-Session-Id, X-Application-Id, X-Application-Version, X-User-Id");
        next();
    });
    const cloudConfig = BentleyCloudRpcManager.initializeImpl({ info: { title: "viewerapp", version: "v2.0" } }, getRpcInterfaces("browser"));
    app.get(/\/imodel\//, async (req: any, res: any) => cloudConfig.protocol.handleOperationGetRequest(req, res));
    app.post(/\/imodel\//, async (req: any, res: any) => cloudConfig.protocol.handleOperationPostRequest(req, res));
    // imodel backend end
    app.use(cors({ origin: "*", credentials: true }));
    app.use(express.json());
    /// catch 404 and forward to err handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        const err: ResponseError = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// err handlers
    app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
        //Handle 401 thrown by express-jwt library
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status || 401)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    app.use((err: ResponseError, req: Request, res: Response) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            },
            code: err.status
        });
    });
};
