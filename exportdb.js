const { MongoClient } = require("mongodb");
const fs = require("fs");
const uri = "mongodb://localhost:27017/"; 
const dbName = "short-url"

async function exportCollections() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        
        console.log("Collections found:", collectionNames);
       
        for (const name of collectionNames) {
            const collection = db.collection(name);
            const data = await collection.find({}).toArray();
            
            fs.writeFileSync(`${name}.json`, JSON.stringify(data, null, 2));
            console.log(`Exported ${name}.json`);
        }
    } catch (error) {
        console.error("Error exporting collections:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

exportCollections();
