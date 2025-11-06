import { useQuery } from '@tanstack/react-query'
import { pingApi } from '../../../apis/ping.js'

// read about caching in frontend , 
// how is it done using reactQuery
// what is cache-time and stale time 

export default function usePing(){
    const { isLoading, isError, data, error  } = useQuery({
        queryFn : pingApi,
        queryKey : 'ping',
        staleTime : 10000,
    })

    return {
        isLoading,
        isError,
        data,
        error
    }
}