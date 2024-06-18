import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { UpdateJenisAssetSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import { useOpenJenisAsset } from '../hooks/use-open-jenis-asset';
import { useGetJenisAsset } from '../api/use-get-jenis-asset';
import { useEditJenisAsset } from '../api/use-edit-jenis-asset';
import { useGetAllKategoriAsset } from '@/features/kategori-asset/api/use-get-all-kategori-asset';
import { useGetAllSatuanAsset } from '@/features/satuan-asset/api/use-get-all-satuan-asset';
import { useCreateSatuanAsset } from '@/features/satuan-asset/api/use-create-satuan-asset';
import { JenisAssetForm } from './jenis-asset-form';


const formSchema = UpdateJenisAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function EditJenisAssetSheet() {
    const { isOpen, onClose, id } = useOpenJenisAsset();

    const jenisAssetQuery = useGetJenisAsset(id)
    const editMutation = useEditJenisAsset(id!);

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


    const isPending = editMutation.isPending || satuanAssetMutation.isPending;
    const isLoading = jenisAssetQuery.isLoading || satuanAssetQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = jenisAssetQuery.data ? {
        kode: jenisAssetQuery.data.kode,
        nama: jenisAssetQuery.data.nama,
        satuanAssetId: jenisAssetQuery.data.satuanAssetId.toString(),
        kategoriAssetId: jenisAssetQuery.data.kategoriAssetId,
        keterangan: jenisAssetQuery.data.keterangan
    } : {
        kode: "",
        nama: "",
        satuanAssetId: "",
        kategoriAssetId: "",
        keterangan: ""
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Edit Ruangan
                    </SheetTitle>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <JenisAssetForm
                            onSubmit={onSubmit}
                            disable={isPending}
                            kategoriAssetOptions={kategoriAssetOptions}
                            satuanAssetOptions={satuanAssetOptions}
                            onCreateSatuanAsset={onCreateSatuanAsset}
                            defaultValues={defaultValues}
                        />
                    )
                }


            </SheetContent>
        </Sheet>
    )
}
