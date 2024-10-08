import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import 'express-async-errors'
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json'

import { router } from "./routes";

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(router);

app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if(err instanceof Error){
        //Se for uma instancia do tipo ERROR
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

app.use('/v1', router)
app.listen(3333, () => console.log('Back-end working on', '3333'))