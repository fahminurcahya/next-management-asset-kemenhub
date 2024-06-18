import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.ruangan["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.ruangan["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteRuangan = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.ruangan["bulk-delete"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete direktorat");
            }
        },
        onSuccess: () => {
            toast.success("Ruangan deleted")
            querClient.invalidateQueries({ queryKey: ["ruangan"] })
            //TODO: 
        },
        onError: () => {
            toast.error("Failed to delete ruangan")
        }
    })

    return mutation;
}