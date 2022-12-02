const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wez9mq6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const resellproduct = client.db('resellproduct').collection('productCullection')
        const booking = client.db('resellproduct').collection('bookingCullection')
        const users = client.db('resellproduct').collection('userCollection')
        app.get('/product', async(req, res) => {
            const query = {}
            const product = await resellproduct.find(query).toArray();
            res.send(product)
        })
        // app.get('/users', async(req, res) => {
        //     const query ={}
        //     const users = await users.find(query).toArray();
        //     const userQuery = 
        // })
        app.get('/user', async(req, res) => {
            const user = req.query.email
            const query = {email: user}
            const userInformation = await users.find(query).toArray()
            console.log(userInformation)
            res.send(userInformation)
        })
        app.get('/product', async(req, res) => {
            const user = req.query.email
            const query = {email: user}
            const result = await resellproduct.find(query).toArray()
            res.send(result)
        })
        app.get('/booking', async(req, res) => {
            const user = req.query.email
            const query = {email: user}
            const result = await booking.find(query).toArray()
            res.send(result)
        })
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await users.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        })
        app.post('/user', async(req, res) => {
            const user = req.body;
            const userInformation = await users.insertOne(user)
            res.send(userInformation)
        })
        app.post('/product', async(req, res) => {
            const product = req.body;
            const result = await resellproduct.insertOne(product)
            res.send(result)
        })
        app.post('/booked', async(req, res) => {
            const product = req.body;
            const result = await booking.insertOne(product)
            res.send(result)
        })
        app.delete('/product/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await users.deleteOne(query);
            res.send(result)
        })
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await users.deleteOne(query);
            res.send(result)
        })
        // app.put('/user/admin/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //             role: 'admin'
        //         }
        //     }
        //     const result = await users.updateOne(filter, updatedDoc, options);
        //     res.send(result);
        // });
    }
    finally{
    }
}
run().catch(console.log)

app.get('/', async(req, res) => {
    res.send('portal is open')
})
app.listen(port, () => console.log(`portal is running ${port}`))
// resellproduct
// productCullection