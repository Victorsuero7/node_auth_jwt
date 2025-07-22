import mongoose from "mongoose";

interface Options {
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase {
    static async connect(options: Options) {

        const { dbName, mongoUrl } = options

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            })

            console.log('Mongo conectado correctamente');

            
        } catch (e) {
            console.log('Error al conectar mongo');
            throw e
        }
    }
}