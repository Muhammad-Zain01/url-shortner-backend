const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

class Database {
    constructor() {
        this.uri = process.env.MONGO_DB_URL;
        this.dbConnection = false;
        this.db = 'ShortnerDB';
        this.collection = 'ShortnerCollection';
        this.client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });;
    }
    async connect() {
        await this.client.connect();
        this.dbConnection = this.client.db(this.db)
        return true
    }
    async disconnect() {
        await this.client.close();
        this.dbConnection = false;
        return true
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
            const removeOne = (query) => { return DocSnap.deleteOne(query) }
            const removeMany = (query) => { return DocSnap.deleteMany(query) }
            return { removeOne, removeMany }
        }
        return false;
    }
    async update(collection) {
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            const updateOne = (query, data) => { return DocSnap.updateOne(query, data) }
            const updateMany = (query, data) => { return DocSnap.updateMany(query, data) }
            return { updateOne, updateMany }
        }
        return false
    }
    async addDocument(collection){
        if (this.dbConnection) {
            const DocSnap = await this.dbConnection.collection(collection);
            const addOne = (data) => { return DocSnap.insertOne(data) }
            const addMany = (data) => { return DocSnap.insertMany(data) }
            return { addOne, addMany }
        }
        return false
    }
}

module.exports = Database;