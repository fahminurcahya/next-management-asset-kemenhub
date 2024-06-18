import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["kategori-asset"][":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api["kategori-asset"][":id"]["$patch"]>["json"];

export const useEditKategoriAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["kategori-asset"][":id"]["$patch"]({
                json,
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to edit kategori asset");
            }
        },
        onSuccess: () => {
            toast.success("kategori asset updated")
            querClient.invalidateQueries({ queryKey: ["kategoriAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["kategoriAsset"] })

        },
        onError: () => {
            toast.error("Failed to edit kategori asset")
        }
    })

    return mutation;
}