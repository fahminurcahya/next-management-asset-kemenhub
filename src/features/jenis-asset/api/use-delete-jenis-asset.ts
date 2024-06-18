import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["jenis-asset"][":id"]["$delete"]>;

export const useDeleteJenisAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api["jenis-asset"][":id"]["$delete"]({
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete jenis asset");
            }
        },
        onSuccess: () => {
            toast.success("Jenis asset deleted")
            querClient.invalidateQueries({ queryKey: ["jenisAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["jenisAsset"] })

        },
        onError: () => {
            toast.error("Failed to delete jenis asset")
        }
    })

    return mutation;
}