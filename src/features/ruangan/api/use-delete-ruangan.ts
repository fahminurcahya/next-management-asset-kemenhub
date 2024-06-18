import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.ruangan[":id"]["$delete"]>;

export const useDeleteRuangan = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.ruangan[":id"]["$delete"]({
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete ruangan");
            }
        },
        onSuccess: () => {
            toast.success("Ruangan deleted")
            querClient.invalidateQueries({ queryKey: ["ruangan", { id }] })
            querClient.invalidateQueries({ queryKey: ["ruangan"] })

        },
        onError: () => {
            toast.error("Failed to delete ruangan")
        }
    })

    return mutation;
}