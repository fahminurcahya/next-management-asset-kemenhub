import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.ruangan.$post>;
type RequestType = InferRequestType<typeof client.api.ruangan.$post>["json"];

export const useCreateRuangan = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            console.log(json)
            const response = await client.api.ruangan.$post({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create ruangan");
            }
        },
        onSuccess: () => {
            toast.success("Success to create ruangan")
            querClient.invalidateQueries({ queryKey: ["ruangan"] })
        },
        onError: () => {

            toast.error("Failed to create ruangan")
        }
    })

    return mutation;
}