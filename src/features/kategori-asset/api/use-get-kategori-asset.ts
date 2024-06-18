import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetKategoriAsset = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["kategoriAsset", { id }],
        queryFn: async () => {
            const response = await client.api["kategori-asset"][":id"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch kategori asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
