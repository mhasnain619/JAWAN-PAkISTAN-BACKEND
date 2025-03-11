import express from 'express'
import mongoose from 'mongoose';
import postModel from './models/postSchema.js';
const app = express()

const PORT = 5000

// middlewere 
// forcefully convert data into json

app.use(express.json())


const DB_URI = 'mongodb+srv://anaintay4:anaintay4@cluster0.fpl6n.mongodb.net/'

mongoose.connect(DB_URI)

mongoose.connection.on('connected', () => {
    console.log('mongodb is connected successfully')
})

mongoose.connection.on('error', (err) => {
    console.log(err);

})

// create server using express js

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


app.get('/', (req, res) => {
    res.send({
        message: 'Hello, World!',
        status: 200
    })
})




// endpoints user

// post API
app.post('/createPost', async (req, res) => {
    try {
        const { title, desc } = req.body;
        if (!title || !desc) {
            return res.status(400).json({
                message: 'please fill the data'
            })
        }
        let obj = {
            title,
            desc
        }
        const saveData = await postModel.create(obj);
        res.status(200).json({
            message: 'post created successfully',
            saveData
        })
    } catch (error) {

    }

})

// get API
app.get('/getPost', async (req, res) => {
    try {
        const getData = await postModel.find();
        res.status(200).json({
            message: 'get all post',
            getData
        })

    } catch (error) {
        console.log(error);

    }

})

// update API
app.put('/updatePost', async (req, res) => {
    const { title, desc, postId } = req.body;
    let updateObj = {
        title,
        desc
    }
    await postModel.findByIdAndUpdate(postId, updateObj);
    res.status(200).json({
        message: 'post updated successfully'
    })
})

// delete API
app.delete('/deletePost/:id', async (req, res) => {

    const { id } = req.params;
    await postModel.findByIdAndDelete(id);
    res.status(200).json({
        message: 'post deleted successfully'
    })

})