import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["satuan-asset"][":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api["satuan-asset"][":id"]["$patch"]>["json"];

export const useEditSatuanAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["satuan-asset"][":id"]["$patch"]({
                json,
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to edit satuan asset");
            }
        },
        onSuccess: () => {
            toast.success("Satuan asset updated")
            querClient.invalidateQueries({ queryKey: ["satuanAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["satuanAsset"] })

        },
        onError: () => {
            toast.error("Failed to edit satuan asset")
        }
    })

    return mutation;
}