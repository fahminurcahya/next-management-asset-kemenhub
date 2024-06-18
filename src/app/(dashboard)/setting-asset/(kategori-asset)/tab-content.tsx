"use client"

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteKategoriAsset } from "@/features/kategori-asset/api/use-bulk-delete-kategori-asset";
import { useGetAllKategoriAsset } from "@/features/kategori-asset/api/use-get-all-kategori-asset";
import { useNewKategoriAsset } from "@/features/kategori-asset/hooks/use-new-kategori-asset";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
const TabContentKategoriAsset = () => {

    const newKategoriAsset = useNewKategoriAsset();

    const deleteKategoriAsset = useBulkDeleteKategoriAsset();
    const kategoriAssetQuery = useGetAllKategoriAsset();
    const kategoriAsset = kategoriAssetQuery.data || [];

    const isDisabled =
        kategoriAssetQuery.isLoading || deleteKategoriAsset.isPending;

    if (kategoriAssetQuery.isLoading) {
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
                <Button size="sm" onClick={newKategoriAsset.onOpen}>
                    <Plus className="size-4 mr-2" />
                    Add New
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    disabled={isDisabled}
                    filterKey="nama"
                    columns={columns}
                    data={kategoriAsset}
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteKategoriAsset.mutate({ ids })
                    }} />
            </CardContent>
        </Card>
    );
}

export default TabContentKategoriAsset;