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

    const links: SocialNetwork[] = JSON.parse(user.links)
    const handleEnableSocial = (socialNetwork: string) => {
        // Se recorre el arreglo de redes sociales totales para encontrar la red indicada
        // y alternar su estado "enabled" (activado/desactivado) si la URL es válida.
        const updatedLinks = totaLinkSocials.map((item) => {
            // Si el nombre del item coincide con la red social a modificar
            if (item.name === socialNetwork) {
                // Verifica que la URL sea válida
                if (isValidUrl(item.url)) {
                    // Si es válida, invierte el estado "enabled" (true pasa a false y viceversa)
                    return { ...item, enabled: !item.enabled };
                } else {
                    // Si la URL no es válida, muestra un mensaje de error y no cambia el estado
                    toast.error('URL is not valid.');
                    return item;
                }
            }
            // Para el resto de items que no coinciden, se devuelven sin cambios
            return item;
        });

        let updatedItems: SocialNetwork[] = [];
        // Se busca el item actualizado correspondiente a la red social modificada
        const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork);

        if (selectedSocialNetwork?.enabled) {
            // Si la red social está habilitada después de la actualización

            // Se asigna un nuevo ID basado en la cantidad de links que están habilitados
            const id = links.filter((link) => link.enabled).length + 1;

            if (links.some((link) => link.name === socialNetwork)) {
                // Si el link ya existe en el usuario, se actualiza su estado a habilitado y se asigna el nuevo ID
                updatedItems = links.map((link) =>
                    link.name === socialNetwork
                        ? { ...link, enabled: true, id }
                        : link
                );
            } else {
                // Si el link no existe, se crea un nuevo item combinando la información del link actualizado
                // y se le asigna el nuevo ID, luego se agrega al arreglo de links del usuario
                const newItem = {
                    ...selectedSocialNetwork,
                    id,
                };
                updatedItems = [...links, newItem];
            }
        } else {
            // Si la red social se está deshabilitando

            // Se encuentra el índice del link a deshabilitar en el arreglo original
            const indexToDisable = links.findIndex((link) => link.name === socialNetwork);

            // Se recorre el arreglo de links para:
            updatedItems = links.map((link) => {
                if (link.name === socialNetwork) {
                    // Marcar el link como deshabilitado y reiniciar su ID a 0
                    return { ...link, id: 0, enabled: false };
                } else if (link.id > links[indexToDisable].id) {
                    // Para los links que vienen después del deshabilitado, se ajusta su ID decrementándolo en 1
                    return { ...link, id: link.id - 1 }; // Ajustar índices
                } else {
                    // Los links anteriores se mantienen sin cambios
                    return link;
                }
            });
        }

        // Se actualiza el estado general de las redes sociales con los cambios realizados
        setTotaLinkSocials(updatedLinks);

        // Se actualiza la caché del usuario (por ejemplo, en React Query) con los nuevos links serializados a JSON
        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems),
            };
        });
    };

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