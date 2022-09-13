import {useState} from "react";

export const usePost = (url, dataToPost) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState();


    const getData = () => {
        setIsError(false);
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'ingredients': dataToPost})
        })
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
