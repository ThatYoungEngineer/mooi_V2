import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://10.10.10.184:9000/api",
})

export default apiClient;