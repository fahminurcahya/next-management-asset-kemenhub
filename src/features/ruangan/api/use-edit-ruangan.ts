import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.ruangan[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.ruangan[":id"]["$patch"]>["json"];

export const useEditRuangan = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.ruangan[":id"]["$patch"]({
                json,
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to edit ruangan");
            }
        },
        onSuccess: () => {
            toast.success("Ruangan updated")
            querClient.invalidateQueries({ queryKey: ["ruangan", { id }] })
            querClient.invalidateQueries({ queryKey: ["ruangan"] })

        },
        onError: () => {
            toast.error("Failed to edit ruangan")
        }
    })

    return mutation;
}