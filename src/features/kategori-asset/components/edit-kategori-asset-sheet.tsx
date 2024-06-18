import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { UpdateKategoriAssetSchema } from '@/schemas';
import { useEditKategoriAsset } from '../api/use-edit-kategori-asset';
import { useOpenKategoriAsset } from '../hooks/use-open-kategori-asset';
import { useGetKategoriAsset } from '../api/use-get-kategori-asset';
import { Loader2 } from 'lucide-react';
import { KategoriAssetForm } from './kategori-asset-form';


const formSchema = UpdateKategoriAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function EditKategoriAssetSheet() {
    const { isOpen, onClose, id } = useOpenKategoriAsset();

    const kategoriAssetQuery = useGetKategoriAsset(id)
    const editMutation = useEditKategoriAsset(id!);

    const isPending = editMutation.isPending;
    const isLoading = kategoriAssetQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = kategoriAssetQuery.data ? {
        kode: kategoriAssetQuery.data.kode,
        nama: kategoriAssetQuery.data.nama,
    } : {
        kode: "",
        nama: "",
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Edit kategori asset
                    </SheetTitle>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <KategoriAssetForm
                            id={id}
                            onSubmit={onSubmit}
                            disable={isPending}
                            defaultValues={defaultValues}
                        />
                    )
                }


            </SheetContent>
        </Sheet>
    )
}
