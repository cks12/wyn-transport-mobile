import db from "./db";
import Server from "./server"

(async () => {
    const server = new Server();
    console.clear();
    console.log("> Conectando ao banco de dados")
    await db.$connect();
    server.start();
})()