import { useState, useEffect, useCallback } from "react";
import { FetchConfig } from "../ts/types/FetchConfig";
import { FetchState } from "../ts/types/FetchState";

/* eslint-disable */
export function useFetch<T>({method, url, header, body, transform} : FetchConfig) : FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async() => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "appLication/json",
                    ...header
                },
                body: method !== "GET" && body ? JSON.stringify(body) : undefined
            });
            const responseData = await response.json();
            setData(transform ? responseData.map(transform) : responseData);
        } catch(error) {
            setError("Something is wrong");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(()=>{
        fetchData();
    }, [fetchData]);

    return {
        data, loading, error
    }
}




