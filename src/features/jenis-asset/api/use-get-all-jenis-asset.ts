import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllJenisAsset = () => {
    const query = useQuery({
        queryKey: ["jenisAsset"],
        queryFn: async () => {
            const response = await client.api["jenis-asset"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch jenis asset");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
