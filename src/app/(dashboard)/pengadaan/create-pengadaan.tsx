import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllDirektorat } from "@/features/direktorat/api/use-get-all-direktorat";
import { useGetAllKategoriAsset } from "@/features/kategori-asset/api/use-get-all-kategori-asset";
import { useGetAllJenisPengadaan } from "@/features/pengadaan/api/use-get-all-jenis-pengadaan";
import { PengadaanForm } from "@/features/pengadaan/components/pengadaan-form";
import { useGetNextCode } from "@/features/pengadaan/api/use-get-next-code";
import { useGetAllSatuanAsset } from "@/features/satuan-asset/api/use-get-all-satuan-asset";
import { Loader2 } from "lucide-react";
import { DirektoratForm } from "@/features/direktorat/components/direktorat-form";
import { useGetJenisAssetByKategori } from "@/features/jenis-asset/api/use-get-jenis-asset-by-kategori";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllRuangan } from "@/features/ruangan/api/use-get-all-ruangan";
import { useGetJenisAsset } from "@/features/jenis-asset/api/use-get-jenis-asset";
import { KondisiOptions } from "@/lib/constant";
import { useGetAllJenisAsset } from "@/features/jenis-asset/api/use-get-all-jenis-asset";
import { useCreateJenisAsset } from "@/features/jenis-asset/api/use-create-jenis-asset";


type Props = {
    onCancelCreate: () => void;
}

const CreatePengadaanPage = ({
    onCancelCreate
}: Props) => {


    const direktoratQuery = useGetAllDirektorat()


    const direktoratOptions = (direktoratQuery.data ?? []).map((direktorat) => ({
        label: direktorat.nama,
        value: direktorat.id,
    }))


    const jenisPengadaanQuery = useGetAllJenisPengadaan();

    const jenisPengadaanOptions = (jenisPengadaanQuery.data ?? []).map((jenisPengadaan) => ({
        label: jenisPengadaan.nama,
        value: jenisPengadaan.id.toString(),
    }))


    const kategoriAssetQuery = useGetAllKategoriAsset();

    const kategoriAssetOptions = (kategoriAssetQuery.data ?? []).map((kategoriAsset) => ({
        label: kategoriAsset.nama,
        value: kategoriAsset.id,
    }))



    const jenisAssetQuery = useGetAllJenisAsset();

    const jenisAssetOptions = (jenisAssetQuery.data ?? []).map((jenisAsset) => ({
        label: jenisAsset.nama,
        value: jenisAsset.id.toString(),
    }))


    const ruanganQuery = useGetAllRuangan();

    const ruanganOptions = (ruanganQuery.data ?? []).map((ruangan) => ({
        label: ruangan.nama,
        value: ruangan.id.toString(),
    }))


    const nextCodeQuery = useGetNextCode();



    const isLoading = direktoratQuery.isLoading
        || jenisPengadaanQuery.isLoading
        || kategoriAssetQuery.isLoading
        || nextCodeQuery.isLoading;



    const defaultValue = {
        noPengadaan: nextCodeQuery.data ? nextCodeQuery.data : "",
        tglPengadaan: new Date(),
        tujuan: "",
        noPo: "",
        jenisPengadaanId: "",
        invoice: "",
        photo: "",
        direktoratId: "",
        asset: []
    }


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Create Pengadaan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        ) : (
                            <PengadaanForm
                                onCancelCreate={onCancelCreate}
                                direktoratOptions={direktoratOptions}
                                jenisPengadaanOptions={jenisPengadaanOptions}
                                ketegoriAssetOptions={kategoriAssetOptions}
                                jenisAssetOptions={jenisAssetOptions}
                                kondisiOptions={KondisiOptions}
                                ruanganOptions={ruanganOptions}
                                defaultValues={defaultValue}
                            />
                        )
                    }

                </CardContent>
            </Card>
        </div>
    );
}

export default CreatePengadaanPage;