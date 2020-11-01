import axios from 'axios'

const ApiService = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: {
        'Authorization': 'Bearer ZW5oDY80VNVcHnM0zj0FdO8EQAsRcZkOtXQcFxNdJmaNSIrdmzkoDnKD6QoUAyi5PnDA0aKnm06fwNs',
    },
});

export default ApiService