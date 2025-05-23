import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/TotaLinkAPI";
import TotaLink from "../components/TotaLink";


export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false,
    })

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to='/auth/login' />

    //Render component
    if (data) return <TotaLink data={data} />

}