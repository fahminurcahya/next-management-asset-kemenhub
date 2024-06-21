import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetNextCode = () => {
    const query = useQuery({
        queryKey: ["nextCode"],
        queryFn: async () => {
            const response = await client.api.pengadaan["next-code"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch next code");
            }

            const { code } = await response.json();
            return code;
        }
    })

    return query;
}


