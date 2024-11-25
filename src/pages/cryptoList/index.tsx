import { useEffect, useState } from "react";
import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import {Table} from "antd";
import type {TableProps} from "antd";
import { CurrencyResponseModel } from "../../ts/types/CurrencyResponceModels";



const CryptoList = () => {
    const {data, loading, error} = useFetch<CurrencyResponseModel[]>({
        url:`${requestUrls.coinsMarkets}?vs_currency=usd`
    })

    //todo move to useMemo

    const columns: TableProps<CurrencyResponseModel>["columns"] = [
        {
            title: "#ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (value) => {
                return(
                    <img src={value} width={50} height={50} />
                )
            }
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Price Change 24",
            dataIndex: "price_change_24h",
            key: "price_change_24h"
        }
    ]

    
    const handleNavigatePage = (row: CurrencyResponseModel) => {
        console.log(row.id);
    }

    console.log(process.env);

    return (
        <div>
            <Table<CurrencyResponseModel> rowKey="key"
            columns={columns}
            loading={loading}
            dataSource = {data || []}
            onRow={(row)=>{
                return {
                    onClick:() =>  handleNavigatePage(row)
                }
            }}
            
            />
        </div>
    )

}

export default CryptoList;