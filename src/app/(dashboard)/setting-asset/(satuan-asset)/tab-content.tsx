"use client"

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useNewSatuanAsset } from "@/features/satuan-asset/hooks/use-new-satuan-asset";
import { useBulkDeleteSatuanAsset } from "@/features/satuan-asset/api/use-bulk-delete-satuan-asset";
import { useGetAllSatuanAsset } from "@/features/satuan-asset/api/use-get-all-satuan-asset";

const TabContentSatuanAsset = () => {

    const newSatuanAsset = useNewSatuanAsset();

    const deleteSatuanAsset = useBulkDeleteSatuanAsset();
    const satuanAssetQuery = useGetAllSatuanAsset();
    const satuanAsset = satuanAssetQuery.data || [];

    const isDisabled =
        satuanAssetQuery.isLoading || deleteSatuanAsset.isPending;

    if (satuanAssetQuery.isLoading) {
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
                    Kategori Asset
                </CardTitle>
                <Button size="sm" onClick={newSatuanAsset.onOpen}>
                    <Plus className="size-4 mr-2" />
                    Add New
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    disabled={isDisabled}
                    filterKey="nama"
                    columns={columns}
                    data={satuanAsset}
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteSatuanAsset.mutate({ ids })
                    }} />
            </CardContent>
        </Card>
    );
}

export default TabContentSatuanAsset;