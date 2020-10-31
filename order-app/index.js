const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const models = require('./models/index');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const getPagingData = (itmes, page, limit) => {
    const { count: totalItems, rows: data } = itmes;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages, currentPage };
};

app.get('/', async (req, res) => {
    res.send("Order App")
})

app.get('/orders', async (req, res) => {
    const limit = 8
    const offset = req.params.page || 1
    const orders = await models.Order.findAndCountAll({
        limit,
        offset,
        include: models.OrderDetail
    })
    res.json(getPagingData(orders, offset, limit))
})

app.get('/orders/show/:id', async (req, res) => {
    const order = await models.Order.findByPk(req.params.id, {
        include: {
            model: models.OrderDetail,
            include: [models.Product]
        }
    })
    res.json(order)
})

app.post('/orders', async (req, res) => {
    const request = req.body
    const total_price = request.orders.reduce((tmpPrice, order) => order.qty * order.price, 0)
    const order = await models.Order.
        create({ status: 0, total_price, user_id: 1, OrderDetails: request.orders }, {
            include: [models.OrderDetail]
        })

    // Check Payment Status
    const payment = await axios.post(
        "http://localhost:3001/check-payment",
        { orderId: order.id },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.headers.authorization,
            },
        })
        .then(response => response.data)
        .catch(err => console.log('Error ' + err));

    order.update({ status: payment.isPaid ? 1 : 2 })

    if (payment.isPaid) {
        // Update Status After 10s Order Created
        setTimeout(async function () {
            // Check if order canceled by user
            let checkOrder = await models.Order.findByPk(order.id)
            if (checkOrder.status != 2) {
                checkOrder.update({ status: 3 })
            }
        }, 10000)
    }

    res.json(order)
})

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
})