import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["satuan-asset"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["satuan-asset"]["$post"]>["json"];

export const useCreateSatuanAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            console.log(json)
            const response = await client.api["satuan-asset"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create satuan asset");
            }
        },
        onSuccess: () => {
            toast.success("Success to create satuan asset")
            querClient.invalidateQueries({ queryKey: ["satuanAsset"] })
        },
        onError: () => {

            toast.error("Failed to create satuan asset")
        }
    })

    return mutation;
}