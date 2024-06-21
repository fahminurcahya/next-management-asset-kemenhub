import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["kategori-asset"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["kategori-asset"]["$post"]>["json"];

export const useCreateKategoriAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {

            const response = await client.api["kategori-asset"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create kategori asset");
            }
        },
        onSuccess: () => {
            toast.success("Success to create kategori asset")
            querClient.invalidateQueries({ queryKey: ["kategoriAsset"] })
        },
        onError: () => {

            toast.error("Failed to create kategori asset")
        }
    })

    return mutation;
}