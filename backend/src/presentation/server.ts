import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

interface ServerProps {
    port: number;
    routes: Router;
    publicPath: string;
}

export class Server {

    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(props: ServerProps) {
        const { port, routes, publicPath } = props;
        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;
    }

    public async start(): Promise<void> {
        // CORS
        this.app.use(cors());

        // MIDLEWARES
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // PUBLIC PATH
        this.app.use(express.static(this.publicPath));

        // ROUTES
        this.app.use('/api', this.routes);

        //SPA
        this.app.get('*', (req: Request, res: Response) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}


