import { useEffect, useState } from "react";
import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";


type UserData = {
    firstName: string;
    lastName: string;
    isActiv: boolean;
}


const CryptoList = () => {
    const {data, loading, error} = useFetch<UserData[]>({
        method:"POST",
        url:`${requestUrls.coinsMarkets}?vs_currency=usd`
    })

    console.log(data);
    console.log(loading);



    return (
        <div>
            <h2>CryptoList</h2>
        </div>
    )

}

export default CryptoList;