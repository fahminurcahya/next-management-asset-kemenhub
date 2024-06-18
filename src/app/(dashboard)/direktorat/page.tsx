"use client"


import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { useNewDirektorat } from "@/features/direktorat/hooks/use-new-direktorat";
import { useBulkDeleteDirektorat } from "@/features/direktorat/api/use-bulk-delete-direktorat";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllDirektorat } from "@/features/direktorat/api/use-get-all-direktorat";


const DirektoratPage = () => {

    const newDirektorat = useNewDirektorat();

    const deleteDirektorat = useBulkDeleteDirektorat();
    const direktoratQuery = useGetAllDirektorat();
    const direktorat = direktoratQuery.data || [];

    const isDisabled =
        direktoratQuery.isLoading || deleteDirektorat.isPending;

    if (direktoratQuery.isLoading) {
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
                        Direktorat
                    </CardTitle>
                    <Button size="sm" onClick={newDirektorat.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>

                    <DataTable
                        disabled={isDisabled}
                        filterKey="nama"
                        columns={columns}
                        data={direktorat}
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteDirektorat.mutate({ ids })
                        }} />
                </CardContent>
            </Card>
        </div>
    );
}

export default DirektoratPage;