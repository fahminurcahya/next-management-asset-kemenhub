"use client"

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useNewJenisAsset } from "@/features/jenis-asset/hooks/use-new-jenis-asset";
import { useBulkDeleteJenisAsset } from "@/features/jenis-asset/api/use-bulk-delete-jenis-asset";
import { useGetAllJenisAsset } from "@/features/jenis-asset/api/use-get-all-jenis-asset";
const TabContentJenisAsset = () => {

    const newJenisAsset = useNewJenisAsset();

    const deleteJenisAsset = useBulkDeleteJenisAsset();
    const jenisAssetQuery = useGetAllJenisAsset();
    const jenisAsset = jenisAssetQuery.data || [];

    const isDisabled =
        jenisAssetQuery.isLoading || deleteJenisAsset.isPending;

    if (jenisAssetQuery.isLoading) {
        return (
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="h-[500px] w-full flex items-center justify-center">
                        <Loader2 className="size-6 text-slate-300 animate-spin" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Jenis Asset
                </CardTitle>
                <Button size="sm" onClick={newJenisAsset.onOpen}>
                    <Plus className="size-4 mr-2" />
                    Add New
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    disabled={isDisabled}
                    filterKey="nama"
                    columns={columns}
                    data={jenisAsset}
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteJenisAsset.mutate({ ids })
                    }} />
            </CardContent>
        </Card>
    );
}

export default TabContentJenisAsset;