import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { CreateKategoriAssetSchema } from '@/schemas';
import { KategoriAssetForm } from './kategori-asset-form';
import { useNewKategoriAsset } from '../hooks/use-new-kategori-asset';
import { useCreateKategoriAsset } from '../api/use-create-kategori-asset';


const formSchema = CreateKategoriAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function NewKategoriAssetSheet() {
    const { isOpen, onClose } = useNewKategoriAsset();
    const mutation = useCreateKategoriAsset();

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
                        Tambah Kategori Asset
                    </SheetTitle>
                </SheetHeader>
                <KategoriAssetForm
                    onSubmit={onSubmit}
                    disable={mutation.isPending}
                    defaultValues={{
                        kode: "",
                        nama: ""
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
