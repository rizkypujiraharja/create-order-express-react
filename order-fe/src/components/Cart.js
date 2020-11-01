import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from './../store/actions/cart'
import ApiService from './../api-service'

const Cart = (props) => {
    const dispatch = useDispatch()
    let { data } = props

    const changeQty = (index, e) => {
        let newData = [...data]
        newData[index].qty = e.target.value
        dispatch(setCart(newData))
    }

    const removeCart = (key) => {
        let newData = [...data].filter((item, index) => index !== key)
        dispatch(setCart(newData))
    }

    const order = () => {
        let orders = data.map(cart => {
            return {
                "productId": cart.id,
                "price": cart.price,
                "qty": cart.qty
            }
        })
        ApiService.post('/orders', {
            orders
        }).then(response => {
            dispatch(setCart([]))
            window.location.href = '/order/' + response.data.id
        })
    }

    return (
        <div className="divide-y divide-gray-400">
            {
                data.map((item, index) => {
                    return <div className="flex justify-between items-center hover:bg-gray-100 p-3" key={index}>
                        <div>
                            <p className="text-gray-700 font-semibold">{item.name}</p>
                            <p className="text-gray-600 text-sm">
                                Rp. {item.price}
                            </p>
                        </div>
                        <div>
                            <label>Qty</label>
                            <input type="number" className="w-20 mx-4 py-1 px-3 focus:outline-none rounded border border-gray-300" value={item.qty} onChange={(e) => changeQty(index, e)} />
                            <button className="text-sm bg-red-500 py-1 px-3 rounded text-white" onClick={() => removeCart(index)}>
                                <span className="fa fa-trash"></span>
                            </button>
                        </div>
                    </div>
                })

            }
            <button className="w-full py-2 bg-green-600 text-white rounded" onClick={order}>Checkout</button>
        </div>
    )
}

export default Cart