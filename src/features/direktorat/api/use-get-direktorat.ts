import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetDirektorat = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["direktorat", { id }],
        queryFn: async () => {
            const response = await client.api.direktorat[":id"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch direktorat");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
