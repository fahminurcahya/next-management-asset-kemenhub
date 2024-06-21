import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetAllAsset = () => {
    const params = useSearchParams();
    const status = params.get("status") || "";
    const kondisi = params.get("kondisi") || "";
    const ruanganId = params.get("ruanganId") || "";
    const direktoratId = params.get("ruanganId") || "";

    const query = useQuery({
        queryKey: ["asset", {
            status,
            kondisi,
            ruanganId,
            direktoratId,
        }],
        queryFn: async () => {
            const response = await client.api.asset.$get({
                query: {
                    status,
                    kondisi,
                    ruanganId,
                    direktoratId,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const { data } = await response.json();
            return data;
        }
    })

    return query;
}
