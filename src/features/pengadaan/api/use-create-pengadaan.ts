import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.pengadaan.$post>;
type RequestType = InferRequestType<typeof client.api.pengadaan.$post>["json"];

export const useCreatePengadaan = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {

            const response = await client.api.pengadaan.$post({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create pengadaan");
            }
        },
        onSuccess: () => {
            toast.success("Success to create pengadaan")
            querClient.invalidateQueries({ queryKey: ["pengadaan"] })
        },
        onError: () => {

            toast.error("Failed to create pengadaan")
        }
    })

    return mutation;
}