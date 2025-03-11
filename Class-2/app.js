import { products } from './data.js'
import express from 'express'
import chalk from 'chalk';
const app = express()

const PORT = 5000

// middlewere

app.use(express.json())

// create server using express js

app.listen(PORT, () => {
    console.log(chalk.blue.underline.bold(`server is running on port ${PORT}`))
})


app.get('/', (req, res) => {
    res.send({
        message: 'Hello, World!',
        status: 200
    })
})

// get all products
// app.get('/products', (req, res) => {
//     res.send(products)
// })

//get single products and all products

app.get('/products', (req, res) => {

    const { id } = req.query
    if (id) {
        const filterData = products.filter((e, i) => {
            return e.id == id
        })
        res.send(filterData)
    } else {
        res.send(products);
    }
    console.log(id);
})


// endpoints user

app.get('/getUser', (req, res) => {
    res.json({
        message: 'get user data'
    })
})
app.post('/createUser', (req, res) => {
    let myData = (req.body);
    console.log(myData);
    res.json({
        message: 'user created'
    })
})
app.put('/updateUser', (req, res) => {
    res.json({
        message: 'update user data'
    })
})
app.delete('/deleteUser', (req, res) => {
    res.json({
        message: 'delete user data'
    })
})