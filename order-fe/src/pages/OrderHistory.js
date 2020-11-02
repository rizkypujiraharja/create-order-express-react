import React, { useEffect, useState } from 'react'
import MainLayout from './../layouts/MainLayout'
import ApiService from './../api-service'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const OrderHisotry = () => {
    const [orders, setOrders] = useState([])
    useEffect(function () {
        ApiService.get('/orders')
            .then(response => {
                setOrders(response.data.data)
            })
            .catch(err => {
                swal("Error", err.message, "error");
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
                return `<span class="bg-red-600 rounded text-xs px-5 text-white">Canceled</span>`
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
                        <div className="text-lg font-semibold mb-3">History Order</div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Total Order</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => {
                                        return <tr key={order.id}>
                                            <td className="border px-4 py-2">{order.id}</td>
                                            <td className="border px-4 py-2">Rp. {order.total_price}</td>
                                            <td className="border px-4 py-2"><span dangerouslySetInnerHTML={{ __html: getStatus(order.status) }} /></td>
                                            <td className="border px-4 py-2">{order.createdAt}</td>
                                            <td className="border px-4 py-2">
                                                <Link to={`/order/${order.id}`}>
                                                    <span className="py-1 text-sm px-3 w-full bg-blue-500 rounded text-white">
                                                        <span className="fa fa-eye"></span>
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}

export default OrderHisotry;
