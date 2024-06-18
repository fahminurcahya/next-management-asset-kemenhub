import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["satuan-asset"]["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["satuan-asset"]["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteSatuanAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["satuan-asset"]["bulk-delete"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete satuan asset");
            }
        },
        onSuccess: () => {
            toast.success("Satuan asset deleted")
            querClient.invalidateQueries({ queryKey: ["satuanAsset"] })
            //TODO: 
        },
        onError: () => {
            toast.error("Failed to delete satuan asset")
        }
    })

    return mutation;
}