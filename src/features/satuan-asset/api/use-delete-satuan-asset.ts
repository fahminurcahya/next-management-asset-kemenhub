"use client"

import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["satuan-asset"][":id"]["$delete"]>;

export const useDeleteSatuanAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api["satuan-asset"][":id"]["$delete"]({
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete satuan asset");
            }
        },
        onSuccess: () => {
            toast.success("Satuan asset deleted")
            querClient.invalidateQueries({ queryKey: ["satuanAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["satuanAsset"] })

        },
        onError: () => {
            toast.error("Failed to delete satuan asset")
        }
    })

    return mutation;
}