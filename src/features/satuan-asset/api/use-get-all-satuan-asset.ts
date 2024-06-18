import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSatuanAsset = () => {
    const query = useQuery({
        queryKey: ["satuanAsset"],
        queryFn: async () => {
            const response = await client.api["satuan-asset"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch satuan asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
