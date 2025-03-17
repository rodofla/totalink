
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserByHandle } from '../api/TotaLinkAPI';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import HandleData from '../components/HandleData';



export default function HandleView() {

    const params = useParams()
    const handle = params.handle!
    const { data, error, isLoading } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })

    /** Loading */
    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    /** Error view*/
    if (error) return <Navigate to={'/404'} />

    /** Handle view*/
    if (data) return <HandleData data={data} />
}