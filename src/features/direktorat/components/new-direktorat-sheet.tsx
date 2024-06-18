import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { useNewDirektorat } from '@/features/direktorat/hooks/use-new-direktorat';
import { CreateDirektoratSchema } from '@/schemas';
import { useCreateDirektorat } from '@/features/direktorat/api/use-create-direktorat';
import { DirektoratForm } from '@/features/direktorat/components/direktorat-form';


const formSchema = CreateDirektoratSchema;

type FormValues = z.input<typeof formSchema>;

export default function NewDirektoratSheet() {
    const { isOpen, onClose } = useNewDirektorat();
    const mutation = useCreateDirektorat();

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
                        Tambah Direktorat
                    </SheetTitle>
                </SheetHeader>
                <DirektoratForm
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
