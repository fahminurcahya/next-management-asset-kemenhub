import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRuanganByDirektorat = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["ruanganByDirektorat", { id }],
        queryFn: async () => {
            const response = await client.api.ruangan[":id"]["direktorat"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch ruangan");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
