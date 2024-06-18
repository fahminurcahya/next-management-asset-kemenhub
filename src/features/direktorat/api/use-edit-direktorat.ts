import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.direktorat[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.direktorat[":id"]["$patch"]>["json"];

export const useEditDirektorat = (id: string) => {
    const querClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.direktorat[":id"]["$patch"]({
                json,
                param: { id }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("Failed to edit direktorat");
            }
        },
        onSuccess: () => {
            toast.success("direktorat updated")
            querClient.invalidateQueries({ queryKey: ["direktorat", { id }] })
            querClient.invalidateQueries({ queryKey: ["direktorat"] })

        },
        onError: () => {
            toast.error("Failed to edit direktorat")
        }
    })

    return mutation;
}