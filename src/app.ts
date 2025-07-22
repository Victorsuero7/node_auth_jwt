import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data/mongodb";

(()=>{
main();
})()

async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DBNAME ,
        mongoUrl: envs.MONGO_URL 
    })



    // todo inicio de nuestro server
    new Server({
        // Se pasa la configuracion requerida
    port: envs.PORT,
    routes: AppRoutes.routes
    }).start()
} 