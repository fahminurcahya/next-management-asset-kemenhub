import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { CreateSatuanAssetSchema } from '@/schemas';
import { useNewSatuanAsset } from '../hooks/use-new-satuan-asset';
import { useCreateSatuanAsset } from '../api/use-create-satuan-asset';
import { SatuanAssetForm } from './satuan-asset-form';


const formSchema = CreateSatuanAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function NewSatuanAssetSheet() {
    const { isOpen, onClose } = useNewSatuanAsset();
    const mutation = useCreateSatuanAsset();

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
                        Tambah Satuan asset
                    </SheetTitle>
                </SheetHeader>
                <SatuanAssetForm
                    onSubmit={onSubmit}
                    disable={mutation.isPending}
                    defaultValues={{
                        nama: ""
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
