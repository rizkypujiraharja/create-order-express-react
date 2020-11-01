import React, { useEffect, useState } from 'react'
import MainLayout from './../layouts/MainLayout'
import ApiService from './../api-service'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState({})

    useEffect(function () {
        ApiService.get('/orders/show/' + parseInt(id))
            .then(response => {
                setOrder(response.data)
            })
            .catch(err => {
                console.log(`Error ${err}`)
            })
    }, [])

    const getStatus = status => {
        switch (status) {
            case 0:
                return `<span class="bg-yellow-600 rounded text-xs px-5 text-white">Created</span>`
                break;

            case 1:
                return `<span class="bg-blue-300 rounded text-xs px-5 text-white">Confirmed</span>`
                break;

            case 2:
                return `<span class="bg-red-600 rounded text-xs px-5 text-white">Rejected</span>`
                break;

            case 3:
                return `<span class="bg-green-600 rounded text-xs px-5 text-white">Delivered</span>`
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <MainLayout>
                <div className="w-full sm:px-4 mb-4">
                    <div className="bg-white rounded px-4 py-2 shadow-md mb-4">
                        <div className="text-lg font-semibold mb-3">Detail Order : {order.id}</div>
                        <p>Status : <span dangerouslySetInnerHTML={{ __html: getStatus(order.status) }} /> </p>
                        <p>Total Payment : <span className="font-bold">Rp.{order.total_price}</span></p>

                        <h3 className="py-4">List Product</h3>
                        <div className="divide-y divide-gray-400">
                            {
                                order?.OrderDetails?.map((item, index) => {
                                    return <div className="flex justify-between items-center hover:bg-gray-100 p-3" key={index}>
                                        <div>
                                            <p className="text-gray-700 font-semibold">{item.Product.name}</p>
                                            <p className="text-gray-600 text-sm">
                                                Rp. {item.price} x {item.qty} pcs
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-700 font-semibold">Total</p>
                                            <p className="text-gray-600 text-sm">
                                                Rp. {item.qty * item.price}
                                            </p>
                                        </div>
                                    </div>
                                })

                            }
                        </div >
                        {
                            order.status == 3 ? <button className="bg-red-600 mt-4 rounded text-xs py-2 px-3 text-white">Cancel Order</button> : ''
                        }
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}

export default OrderDetail;
