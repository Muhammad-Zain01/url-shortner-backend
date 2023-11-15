const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

class Database {
    constructor() {
        this.uri = process.env.MONGO_DB_URL;
        this.dbConnection = false;
        this.db = 'ShortnerDB';
        this.client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    async connect() {
        await this.client.connect();
        this.dbConnection = this.client.db(this.db)
        return true
    }
    async disconnect() {
        if (this.dbConnection) {
            await this.client.close();
            this.dbConnection = false;
        }
        return true;
    }
    async getData(collection) {
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            let findObject = {}
            const result = async () => {
                return await DocSnap.find(findObject).toArray();
            }
            const where = (query) => {
                findObject = query;
                return result();
            }
            return { result, where }
        }
        return false;
    }
    async remove(collection) {
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            const One = (query) => { return DocSnap.deleteOne(query) }
            const Many = (query) => { return DocSnap.deleteMany(query) }
            return { One, Many }
        }
        return false;
    }
    async update(collection) {
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            const One = (query, data) => { return DocSnap.updateOne(query, data) }
            const Many = (query, data) => { return DocSnap.updateMany(query, data) }
            return { One, Many }
        }
        return false
    }
    async addDocument(collection){
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            const One = (data) => { return DocSnap.insertOne(data) }
            const Many = (data) => { return DocSnap.insertMany(data) }
            return { One, Many }
        }
        return false
    }
    async addCollection(collection){
        if (this.dbConnection) {
            return await this.dbConnection.createCollection(collection);
        }
        return false
    }
}

const DBInstance = new Database();
DBInstance.connect();
module.exports = DBInstance;