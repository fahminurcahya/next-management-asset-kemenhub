import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.direktorat.$post>;
type RequestType = InferRequestType<typeof client.api.direktorat.$post>["json"];

export const useCreateDirektorat = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.direktorat.$post({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create direktorat");
            }
        },
        onSuccess: () => {
            toast.success("Success to create direktorat")
            querClient.invalidateQueries({ queryKey: ["direktorat"] })
        },
        onError: () => {

            toast.error("Failed to create direktorat")
        }
    })

    return mutation;
}