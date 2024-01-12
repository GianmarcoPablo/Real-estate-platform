import { Server, RouterBase } from "./presentation";
import { envs } from "./config";

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        routes: RouterBase.startRoutes(),
        publicPath: envs.PUBLIC_PATH
    });
    server.start();
}