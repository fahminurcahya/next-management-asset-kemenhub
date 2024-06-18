import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetJenisAsset = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["jenisAsset", { id }],
        queryFn: async () => {
            const response = await client.api["jenis-asset"][":id"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch jenis asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
