"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Loader2, Plus, PlusCircle } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useCreatePengadaan } from "@/features/pengadaan/api/use-create-pengadaan";
import { useGetAllPengadaan } from "@/features/pengadaan/api/use-get-all-pengadaan";
import { columns } from "./columns";
import { PengadaanForm } from "@/features/pengadaan/components/pengadaan-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreatePengadaanPage from "./create-pengadaan";
import { useNewAsset } from "@/features/pengadaan/hooks/use-new-asset";

enum VARIANTS {
    LIST = "LIST",
    CREATE = "CREATE"
};


const PengadaanPage = () => {
    // const [AccountDialog, confirm] = useSelectAccount();
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);

    const { resetData } = useNewAsset()

    const onCreate = () => {
        setVariant(VARIANTS.CREATE);
    }

    const onCancelCreate = () => {
        resetData()
        setVariant(VARIANTS.LIST)
    }

    const pengadaanQuery = useGetAllPengadaan();
    const pengadaan = pengadaanQuery.data || [];

    const isDisabled =
        pengadaanQuery.isLoading

    if (pengadaanQuery.isLoading) {
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


    if (variant == VARIANTS.CREATE) {
        return (
            <CreatePengadaanPage
                onCancelCreate={onCancelCreate}
            />
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Histori Pengadaan
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="w-full lg:w-auto"
                    >
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        disabled={isDisabled}
                        filterKey="noPengadaan"
                        columns={columns}
                        data={pengadaan}
                        onDelete={() => { }} />
                </CardContent>
            </Card>
        </div>
    );
}

export default PengadaanPage;