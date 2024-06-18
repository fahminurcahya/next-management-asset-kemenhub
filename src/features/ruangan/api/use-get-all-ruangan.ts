import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRuangan = () => {
    const query = useQuery({
        queryKey: ["ruangan"],
        queryFn: async () => {
            const response = await client.api.ruangan.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch ruangan");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
