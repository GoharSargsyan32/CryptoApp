import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import {Table} from "antd";
import type {TableProps} from "antd";
import { CurrencyListResponseModel } from "../../ts/types/CurrencyListResponceModels";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../util/constants/routes";
import { useMemo, useState } from "react";
import { useQueryParam } from "../../hooks/useQueryParam";
import {DEFAULT_PAGINATION} from "../../util/constants/pagination";
import Header from "../../components/global/Header";

const CURRENCIES: { [key: string]: { symbol: string; } } = {
    usd: { symbol: "$" },
    aed: { symbol: "AED" },
    eur: { symbol: "€" },
  };


const CryptoList = () => {
    const navigate = useNavigate();
    const [currency, setCurrency] = useState('usd');

    const {getQueryParam, setQueryParam} = useQueryParam();
    const page = getQueryParam("page") || DEFAULT_PAGINATION.page;
    const pageSize = getQueryParam("pageSize") || DEFAULT_PAGINATION.pageSize;


    const {data, loading} = useFetch<CurrencyListResponseModel[]>({
        url:`${requestUrls.coinsMarkets}/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY
        },
        transform: (item: CurrencyListResponseModel) => {
            return {
                ...item,
                symbol: CURRENCIES[currency].symbol
            }
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
                            <img src={value} width={50} height={50} alt="icon" />
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
                    key: "price_change_24h",
                    render: (value: number, record: CurrencyListResponseModel) => {
                        return (
                          <span>
                            {record.symbol} {value}
                          </span>
                          )
                        }},
            ]        
    }, [])

    
    const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
        navigate(`${ROUTE_PATHS.CRYPTO_DETAIL}/${rowData.id}`, )
    }

    console.log(process.env);

    const currencySelect = (id: string) => {
        setCurrency(id);
    }

    return (
        <div>
            <Header currencySelect={currencySelect}/>
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