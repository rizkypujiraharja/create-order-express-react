import React, { useEffect, useState } from 'react'
import MainLayout from './../layouts/MainLayout'
import ListProduct from './../components/ListProduct'
import Cart from './../components/Cart'
import ApiService from './../api-service'
import { useDispatch, useSelector } from 'react-redux'

import { setProducts } from './../store/actions/product'

const Order = () => {

    const dispatch = useDispatch()
    let products = useSelector(state => state.product.products)
    let cart = useSelector(state => state.cart.cart)

    useEffect(function () {
        ApiService.get('/products')
            .then(response => {
                dispatch(setProducts(response.data))
            })
            .catch(err => {
                console.log(`Error ${err}`)
            })
    }, [])


    return (
        <div>
            <MainLayout>
                <div className="flex flex-wrap sm:-mx-4 mt-4">
                    <div className="w-full sm:w-1/2 sm:px-4 mb-4">
                        <div className="bg-white rounded px-4 py-2 shadow-md mb-4">
                            <div className="text-lg font-semibold mb-3">List Product</div>
                            <ListProduct products={products} cart={cart}></ListProduct>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 sm:px-4 mb-4">
                        <div className="bg-white rounded px-4 py-2 shadow-md overflow-y-auto">
                            <div className="text-lg font-semibold mb-3">Cart</div>
                            {
                                !cart.length ? <div className="h-32 text-center pt-12">Please select product</div> :
                                    <Cart data={cart}></Cart>
                            }
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}

export default Order;
