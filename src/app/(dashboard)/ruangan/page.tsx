"use client"


import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllRuangan } from "@/features/ruangan/api/use-get-all-ruangan";
import { useNewRuangan } from "@/features/ruangan/hooks/use-new-ruangan";
import { useBulkDeleteRuangan } from "@/features/ruangan/api/use-bulk-delete-ruangan";
import { useSession } from "next-auth/react";
import Forbidden from "@/components/forbidden";


const RuanganPage = () => {

    const newRuangan = useNewRuangan();

    const deleteRuangan = useBulkDeleteRuangan();
    const ruanganQuery = useGetAllRuangan();
    const ruangan = ruanganQuery.data || [];

    const isDisabled =
        ruanganQuery.isLoading || deleteRuangan.isPending;

    const { data: session } = useSession();

    if (session?.user.role != "ADMIN") {
        return (
            <Forbidden />
        )
    }

    if (ruanganQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Ruangan
                    </CardTitle>
                    <Button size="sm" onClick={newRuangan.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>

                    <DataTable
                        disabled={isDisabled}
                        filterKey="nama"
                        columns={columns}
                        data={ruangan}
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteRuangan.mutate({ ids })
                        }} />
                </CardContent>
            </Card>
        </div>
    );
}

export default RuanganPage;