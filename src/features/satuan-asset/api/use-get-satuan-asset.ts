import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSatuanAsset = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["satuanAsset", { id }],
        queryFn: async () => {
            const response = await client.api["satuan-asset"][":id"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch satuan asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
