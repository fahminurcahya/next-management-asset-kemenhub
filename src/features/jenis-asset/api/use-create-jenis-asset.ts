import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api["jenis-asset"]["$post"]>;
type RequestType = InferRequestType<typeof client.api["jenis-asset"]["$post"]>["json"];

export const useCreateJenisAsset = () => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api["jenis-asset"]["$post"]({ json });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to create jenis asset");
            }
        },
        onSuccess: () => {
            toast.success("Success to create jenis asset")
            querClient.invalidateQueries({ queryKey: ["jenisAsset"] })
        },
        onError: () => {

            toast.error("Failed to create jenis asset")
        }
    })

    return mutation;
}