import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["kategori-asset"]["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["kategori-asset"]["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteKategoriAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["kategori-asset"]["bulk-delete"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete direktorat");
            }
        },
        onSuccess: () => {
            toast.success("Direktorat deleted")
            querClient.invalidateQueries({ queryKey: ["direktorat"] })
            //TODO: 
        },
        onError: () => {
            toast.error("Failed to delete direktorat")
        }
    })

    return mutation;
}