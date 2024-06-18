import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllKategoriAsset = () => {
    const query = useQuery({
        queryKey: ["kategoriAsset"],
        queryFn: async () => {
            const response = await client.api["kategori-asset"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch kategori asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
