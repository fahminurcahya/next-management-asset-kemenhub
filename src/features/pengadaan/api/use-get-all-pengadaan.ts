import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPengadaan = () => {
    const query = useQuery({
        queryKey: ["pengadaan"],
        queryFn: async () => {
            const response = await client.api.pengadaan.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch pengadaan");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
