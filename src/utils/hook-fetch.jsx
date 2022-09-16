import {useState} from "react";

export const useFetch = (url, method, headers, body) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState();


    const requestOptions = {
        method: method,
        headers: headers,
    }
    if (body) {
        requestOptions.body = JSON.stringify(body)
    }

    const getData = () => {
        setIsError(false);
        fetch(url, requestOptions)
        .then((res) => {
            if (res.ok){
                return res.json() 
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setData(data))
        .catch((err)=>{
            setIsError(true)
            console.log(err.message);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }

    return{
        isLoading,
        isError,
        data,
        getData
    };
}
