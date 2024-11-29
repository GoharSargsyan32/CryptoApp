import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import {Table} from "antd";
import type {TableProps} from "antd";
import { CurrencyListResponseModel } from "../../ts/types/CurrencyListResponceModels";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../util/constants/routes";
import { useMemo, useState } from "react";
import { useQueryParam } from "../../hooks/useQueryParam";
import {DEFAULT_PAGINATION} from "../../util/constants/pagination"


const CryptoList = () => {
    const navigate = useNavigate();

    const {getQueryParam, setQueryParam} = useQueryParam();
    const page = getQueryParam("page") || DEFAULT_PAGINATION.page;
    const pageSize = getQueryParam("pageSize") || DEFAULT_PAGINATION.pageSize;


    const {data, loading, error} = useFetch<CurrencyListResponseModel[]>({
        url:`${requestUrls.coinsMarkets}/coins/markets?vs_currency=usd&per_page=${pageSize}&page=${page}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY
        }
    })

   
    const columns: TableProps<CurrencyListResponseModel>["columns"] = useMemo(()=>{
        return [
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
                },
            ]        
    }, [])

    
    const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
        navigate(`${ROUTE_PATHS.CRYPTO_DETAIL}/${rowData.id}`, )
    }

    console.log(process.env);

    return (
        <div>
            <Table<CurrencyListResponseModel> rowKey="key"
            columns={columns}
            loading={loading}
            dataSource = {data || []}
            pagination={{
                total: 100,
                current: +page,
                pageSize: +pageSize,
                onChange(page, pageSize) {
                    setQueryParam({page,pageSize})
                }
            }}
            onRow={(row)=>{
                return {
                    onClick:() =>  handleNavigateDetailPage(row)
                }
            }}
            
            />
        </div>
    )

}

export default CryptoList;