import {useState} from "react";

export const useFetch = (url) => {

    const [isLoading, SetIsLoading] = useState(false);
    const [isError, SetIsError] = useState(false);
    const [data, setData] = useState([]);


    const getData = () => {
        console.log(url);
        SetIsError(false);
        SetIsLoading(true);
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data.data))
        .catch((err)=>{
            SetIsError(true)
            console.log(err.message);
        })
        .finally(()=>{
            SetIsLoading(false);
        });
    }

    return{
        isLoading,
        isError,
        data,
        getData
    };
}