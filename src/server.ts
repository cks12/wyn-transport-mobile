import express, { Application } from 'express';
import verifyApiKey from './middleware/verifyApiKey';
import reversoRouter from './route/reverso';
import ordemRouter from './route/ordem';

class Server {
    port: string | number;
    app: Application
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express()
        this.app.use(express.json());
        this.routes()
    }
    private routes() {
        this.app.use("/v1/", verifyApiKey);
        this.app.use('/v1/reverso', reversoRouter)
        this.app.use('/v1/ordem', ordemRouter);
        this.app.get("/", (req,res) => {res.send({"Hello":"world"})});
        this.app.get("*",(req,res) => res.status(404).send("ta perdido amg?"))
    }
    start() {
        this.app.listen(this.port, this.init.bind(this))
        return this;
    }
    private init() {
        console.log(process.env)
        console.log(`> O servidor está rodando na porta ${this.port}`)
    }
}

export default Server;