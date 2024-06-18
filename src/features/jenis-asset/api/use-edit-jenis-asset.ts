import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["jenis-asset"][":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api["jenis-asset"][":id"]["$patch"]>["json"];

export const useEditJenisAsset = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["jenis-asset"][":id"]["$patch"]({
                json,
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to edit jenis asset");
            }
        },
        onSuccess: () => {
            toast.success("Jenis asset updated")
            querClient.invalidateQueries({ queryKey: ["jenisAsset", { id }] })
            querClient.invalidateQueries({ queryKey: ["jenisAsset"] })

        },
        onError: () => {
            toast.error("Failed to edit jenis asset")
        }
    })

    return mutation;
}