"use client"

import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.direktorat[":id"]["$delete"]>;

export const useDeleteDirektorat = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.direktorat[":id"]["$delete"]({
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to delete direktorat");
            }
        },
        onSuccess: () => {
            toast.success("Direktorat deleted")
            querClient.invalidateQueries({ queryKey: ["direktorat", { id }] })
            querClient.invalidateQueries({ queryKey: ["direktorat"] })

        },
        onError: () => {
            toast.error("Failed to delete direktorat")
        }
    })

    return mutation;
}