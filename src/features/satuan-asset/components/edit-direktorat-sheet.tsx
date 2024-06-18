import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { CreateSatuanAssetSchema } from '@/schemas';
import { useEditSatuanAsset } from '../api/use-edit-satuan-asset';
import { useOpenSatuanAsset } from '../hooks/use-open-satuan-asset';
import { useGetSatuanAsset } from '../api/use-get-satuan-asset';
import { Loader2 } from 'lucide-react';
import { SatuanAssetForm } from './satuan-asset-form';


const formSchema = CreateSatuanAssetSchema;

type FormValues = z.input<typeof formSchema>;

export default function EditSatuanAssetSheet() {
    const { isOpen, onClose, id } = useOpenSatuanAsset();

    const satuanAssetQuery = useGetSatuanAsset(id)
    const editMutation = useEditSatuanAsset(id!);

    const isPending = editMutation.isPending;
    const isLoading = satuanAssetQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = satuanAssetQuery.data ? {
        nama: satuanAssetQuery.data.nama,
    } : {
        nama: "",
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Edit satuan asset
                    </SheetTitle>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <SatuanAssetForm
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
