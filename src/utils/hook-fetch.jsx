import {useState} from "react";

export const useFetch = (url) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState();


    const getData = () => {
        console.log(url);
        setIsError(false);
        fetch(url)
        .then((res) => {
            if (res.ok){
                return res.json() 
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setData(data.data))
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