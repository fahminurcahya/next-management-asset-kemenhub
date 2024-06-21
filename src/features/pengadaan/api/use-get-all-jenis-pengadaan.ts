import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllJenisPengadaan = () => {
    const query = useQuery({
        queryKey: ["jenisPengadaan"],
        queryFn: async () => {
            const response = await client.api.pengadaan["jenis-pengadaan"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch jenis pengadaan");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
