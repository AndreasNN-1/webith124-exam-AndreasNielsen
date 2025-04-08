import axios from 'axios'
import { useState } from 'react'

const useRequstData = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const makeRequest = async (url, method = "GET", bodydata = null, headers = null, params = null) => {
        setIsLoading(true);

        try {
            let response;
            const config = {
                headers,
                params,
                withCredentials: true,
              };
            switch (method) {
                case "GET":
                    response = await axios.get(url, config);
                    break;
                case "POST":
                    response = await axios.post(url, bodydata, config);
                    break;
                case "DELETE":
                    response = await axios.delete(url, config);
                    break;
                case "PUT":
                    response = await axios.put(url, bodydata, config);
                    break;
                case "PATCH":
                    response = await axios.patch(url, bodydata, config);
                    break;
                default:
                    throw new Error("Invalid method. GET, POST, PUT, DELETE or PATCH was expected");
            }
            setData(response.data);
            setError(null);
        } catch (error) {
            setError("There was an error: " + error.message);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { makeRequest, isLoading, data, error };
}

export default useRequstData;
