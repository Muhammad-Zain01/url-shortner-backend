const { MongoClient, ServerApiVersion } = require('mongodb')

class Database {
    constructor() {
        this.uri = 'mongodb+srv://zainverge:Ii9M7mZve6E0GpUp@cluster0.og8sax5.mongodb.net/?retryWrites=true&w=majority';
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
    async getDocs() {
        
        if (this.dbConnection) {
            const collection = this.dbConnection.collection(this.collection);
            console.log(await collection.getDocuments());
        }
    }
}

module.exports = Database;