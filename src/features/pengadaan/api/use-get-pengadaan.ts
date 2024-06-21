import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetRuangan = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["pengadaan", { id }],
        queryFn: async () => {
            const response = await client.api.pengadaan[":id"].$get({
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
