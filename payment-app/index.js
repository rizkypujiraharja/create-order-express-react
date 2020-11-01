const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send("Payment App")
})

app.post('/check-payment', async (req, res) => {
    res.send({
        orderId: req.body.orderId,
        isPaid: Math.random() >= 0.5
    })
})

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
})