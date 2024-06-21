import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useState } from 'react';
import { z } from 'zod';
import { CreateAssetSchema, CreateSatuanAssetSchema } from '@/schemas';
import { useNewAsset } from '../hooks/use-new-asset';
import { AssetForm } from './asset-form';
import { useGetAllKategoriAsset } from '@/features/kategori-asset/api/use-get-all-kategori-asset';
import { useGetAllSatuanAsset } from '@/features/satuan-asset/api/use-get-all-satuan-asset';
import { KondisiOptions } from '@/lib/constant';
import { useGetJenisAssetByKategori } from '@/features/jenis-asset/api/use-get-jenis-asset-by-kategori';
import { useGetAllRuanganByDirektorat } from '@/features/ruangan/api/use-get-all-ruangan-by-direktorat';
import { Loader2 } from 'lucide-react';


const formSchema = CreateAssetSchema

type FormValues = z.input<typeof formSchema>;


export default function NewAssetSheet() {
    const [kategoriId, setKategoriId] = useState<string | undefined>(""); // Initial id state

    const { isOpen, onClose, onAddAsset, direktoratId } = useNewAsset();


    const kategoriAssetQuery = useGetAllKategoriAsset();

    const kategoriAssetOptions = (kategoriAssetQuery.data ?? []).map((kategoriAsset) => ({
        label: kategoriAsset.nama,
        value: kategoriAsset.id,
    }))


    const satuanAssetQuery = useGetAllSatuanAsset();

    const satuanAssetOptions = (satuanAssetQuery.data ?? []).map((satuanAsset) => ({
        label: satuanAsset.nama,
        value: satuanAsset.id.toString(),
    }))


    const ruanganQuery = useGetAllRuanganByDirektorat(direktoratId);

    const ruanganOptions = (ruanganQuery.data ?? []).map((ruangan) => ({
        label: ruangan.nama,
        value: ruangan.id.toString(),
    }))

    let { data: jenisAssetQuery, isLoading: jenisAssetIsloading, error, invalidateJenisAssetQuery } = useGetJenisAssetByKategori(kategoriId);
    // console.log(jenisAssetQuery)

    let jenisAssetOptions = (jenisAssetQuery ?? []).map((jenisAsset) => ({
        label: jenisAsset.nama,
        value: jenisAsset.id.toString(),
    }))

    const onSelectedKategori = async (id: string | undefined) => {
        setKategoriId(id);
        invalidateJenisAssetQuery(); // Manually invalidate the query with the new id
    }


    const isLoading = kategoriAssetQuery.isLoading
        || satuanAssetQuery.isLoading
        || ruanganQuery.isLoading



    const onSubmit = (values: FormValues) => {
        onAddAsset(values)
        onClose()
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Tambah Satuan asset
                    </SheetTitle>
                </SheetHeader>
                {
                    isLoading
                        ? <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                        : <AssetForm
                            onSelectedKategori={onSelectedKategori}
                            direktoratId={direktoratId}
                            onSubmit={onSubmit}
                            disable={false}
                            ketegoriAssetOptions={kategoriAssetOptions}
                            jenisAssetOptions={jenisAssetOptions}
                            jenisAssetIsloading={jenisAssetIsloading}
                            kondisiOptions={KondisiOptions}
                            ruanganOptions={ruanganOptions}
                            defaultValues={{
                                kategoriAssetId: "",
                                jenisAssetId: "",
                                nama: "",
                                merk: "",
                                spek: "",
                                keterangan: "",
                                kondisi: "BAIK",
                                ruanganId: "",
                                qty: 1,

                            }}
                        />
                }

            </SheetContent>
        </Sheet>

    )
}
