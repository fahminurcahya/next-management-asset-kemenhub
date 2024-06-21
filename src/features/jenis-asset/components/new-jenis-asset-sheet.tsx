import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { CreateJenisAssetSchema } from '@/schemas';
import { useCreateJenisAsset } from '../api/use-create-jenis-asset';
import { useNewJenisAsset } from '../hooks/use-new-jenis-asset';
import { useGetAllKategoriAsset } from '@/features/kategori-asset/api/use-get-all-kategori-asset';
import { JenisAssetForm } from './jenis-asset-form';
import { useGetAllSatuanAsset } from '@/features/satuan-asset/api/use-get-all-satuan-asset';
import { useCreateSatuanAsset } from '@/features/satuan-asset/api/use-create-satuan-asset';


const formSchema = CreateJenisAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function NewJenisAssetSheet() {
    const { isOpen, onClose } = useNewJenisAsset();
    const mutation = useCreateJenisAsset();

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

    const satuanAssetMutation = useCreateSatuanAsset();
    const onCreateSatuanAsset = (nama: string) => satuanAssetMutation.mutate({
        nama
    })


    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Tambah jenis asset
                    </SheetTitle>
                </SheetHeader>
                <JenisAssetForm
                    onSubmit={onSubmit}
                    disable={mutation.isPending || satuanAssetMutation.isPending}
                    kategoriAssetOptions={kategoriAssetOptions}
                    satuanAssetOptions={satuanAssetOptions}
                    onCreateSatuanAsset={onCreateSatuanAsset}
                    defaultValues={{
                        kode: "",
                        nama: "",
                        satuanAssetId: 0,
                        kategoriAssetId: "",
                        keterangan: ""
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
