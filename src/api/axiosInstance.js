import axios from "axios"
const axiosInstance =axios.create({
    baseURL: import.meta.env.VITE_PORT_BACK,
    withCredentials: true,
})

axiosInstance.interceptors.response.use((config)=> {
    return config
}
)

export default axiosInstance