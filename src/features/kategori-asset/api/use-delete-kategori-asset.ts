"use client"

import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["kategori-asset"][":id"]["$delete"]>;

export const useDeleteKategoriAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api["kategori-asset"][":id"]["$delete"]({
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete kategori asset");
            }
        },
        onSuccess: () => {
            toast.success("Kategori asset deleted")
            querClient.invalidateQueries({ queryKey: ["kategoriAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["kategoriAsset"] })

        },
        onError: () => {
            toast.error("Failed to delete kategori asset")
        }
    })

    return mutation;
}