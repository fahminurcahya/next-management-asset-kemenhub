import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["jenis-asset"]["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["jenis-asset"]["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteJenisAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["jenis-asset"]["bulk-delete"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete jenis asset");
            }
        },
        onSuccess: () => {
            toast.success("Jenis asset deleted")
            querClient.invalidateQueries({ queryKey: ["jenisAsset"] })
            //TODO: 
        },
        onError: () => {
            toast.error("Failed to delete jenis asset")
        }
    })

    return mutation;
}