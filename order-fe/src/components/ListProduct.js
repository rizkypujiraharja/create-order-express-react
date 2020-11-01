import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from './../store/actions/cart'

const Product = (props) => {
    const { products, cart } = props
    const dispatch = useDispatch()

    const addItem = (item) => {
        item.qty = 1
        dispatch(addToCart(item))
    }

    const isAddedToCart = id => {
        return cart.filter(data => {
            return data.id == id
        }).length
    }

    const notSelectedProducts = products.filter(product => !isAddedToCart(product.id))

    return (
        <div className="divide-y divide-gray-400">
            { notSelectedProducts.map(product => {
                return <div className="flex justify-between items-center hover:bg-gray-100 p-3" key={product.id} >
                    <div>
                        <p className="text-gray-700 font-semibold">{product.name}</p>
                        <p className="text-gray-600 text-sm">
                            Rp. {product.price}
                        </p>
                    </div>
                    <button className="text-sm bg-blue-500 py-1 px-3 rounded text-white" onClick={() => addItem(product)}>
                        <span className="fa fa-plus"></span>
                    </button>
                </div>
            })}

        </div>
    )
}

export default Product