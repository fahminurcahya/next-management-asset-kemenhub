import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetRuangan = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["ruangan", { id }],
        queryFn: async () => {
            const response = await client.api.ruangan[":id"].$get({
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
