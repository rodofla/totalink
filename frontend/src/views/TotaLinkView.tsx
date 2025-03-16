import { useEffect, useState } from 'react'
import { social } from '../data/social'
import TotaLinkInput from '../components/TotaLinkInput'
import { isValidUrl } from '../utils'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../api/TotaLinkAPI'
import { SocialNetwork, User } from '../types'

export default function TotaLinkView() {
    const [totaLinkSocials, setTotaLinkSocials] = useState(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado Correctamente')
        }
    })

    useEffect(() => {
        const updatedData = totaLinkSocials.map(item => {
            const userLink = JSON.parse(user.links).find((social: SocialNetwork) => social.name === item.name)
            if (userLink) {
                return { ...item, url: userLink.url, enabled: userLink.enabled }
            }
            return item
        })
        setTotaLinkSocials(updatedData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSocials = totaLinkSocials.map(social => {
            if (social.name === e.target.name) {
                return { ...social, url: e.target.value }
            }
            return social
        })
        setTotaLinkSocials(updatedSocials)


    }

    const links : SocialNetwork[] = JSON.parse(user.links)

    const handleEnableSocial = (socialNetwork: string) => {
        const updatedSocials = totaLinkSocials.map(social => {
            if (social.name === socialNetwork) {
                if (isValidUrl(social.url)) {
                    return { ...social, enabled: !social.enabled }
                } else {
                    toast.error('URL no válida')
                }

            }
            return social
        })
        setTotaLinkSocials(updatedSocials)
        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedSocials.find(social => social.name === socialNetwork)

        if (selectedSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)){
                updatedItems = links.map(link => {
                    if(link.name === socialNetwork){
                        return {
                            ...link,
                            enabled: true,
                            id: id
                        }

                    }else{
                        return link
                    }
                })
            }else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id: id
                }
                updatedItems = [...links, newItem]
            }

        }else{
            const indexToUpdate = links.findIndex(link => link.name !== socialNetwork)
            updatedItems = links.map(link =>{
                if(link.name === socialNetwork){
                    return {
                        ...link,
                        id: 0, 
                        enabled: false
                    }
                }else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
                    return {
                        ...link,
                        id: link.id - 1
                    }
                }else{
                    return link
                }
            })
        }

        //almacenar en BBDD
        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    return (
        <>
            <div className='space-y-5'>
                {totaLinkSocials.map(item => (
                    <TotaLinkInput
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                        handleEnableSocial={handleEnableSocial}
                    />
                ))}
                <button
                    className='bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold'
                    onClick={() => mutate(queryClient.getQueryData(['user'])!)}
                >Guardar Cambios</button>
            </div>
        </>
    )
}