import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllDirektorat = () => {
    const query = useQuery({
        queryKey: ["direktorat"],
        queryFn: async () => {
            const response = await client.api.direktorat.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch direktorat");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
