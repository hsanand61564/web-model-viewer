import express from 'express';
import { Server } from 'http';

export class ServerApp {

    public static app = express();
    private static server?: Server;
    public static isRunning: boolean;

    static async start(apiPort?: string) {
        ServerApp.isRunning = false;
        if (!apiPort)
            await require('./library').default({ expressApp: ServerApp.app });

        let port: string = "34001";
        ServerApp.app.set("port", port);
        ServerApp.server = ServerApp.app.listen(port, () => {
            // if (err) {
            //     process.exit(1);
            //     return;
            // }
            ServerApp.isRunning = true;
            console.log(`Final: Server running here: http://localhost:${port}`);
        });

        // increase the timeout to 4 minutes
        ServerApp.server.timeout = 240000;
        return true;
    }

    static async stop() {
        if (ServerApp.server) {
            {
                ServerApp.server.close();
                ServerApp.isRunning = false;
                ServerApp.server = undefined;
                return true;
            }
        } else {
            throw new Error("Server is not defined yet.");
        }
    }
}
