import axios from 'axios'
import { useState } from 'react'

const useRequstData = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const makeRequest = async (url, method = "GET", bodydata = null, headers = null, params = null) => {
        // start loading
        setIsLoading(true);

        try {
            let response;
            const config = {
                headers,
                params,
                withCredentials: true,
              };

              // find what case to use with method
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
                    // none match sorry
                    throw new Error("Invalid method. GET, POST, PUT, DELETE or PATCH was expected");
            }

            // send over data
            setData(response.data);
            setError(null);
        } catch (error) {
             // send over an error :)
            setError("There was an error: " + error.message);
            setData(null);
        } finally {
            // FINALLY stop loading...
            setIsLoading(false);
        }
    };


    // return values to commponts
    return { makeRequest, isLoading, data, error };
}

export default useRequstData;
