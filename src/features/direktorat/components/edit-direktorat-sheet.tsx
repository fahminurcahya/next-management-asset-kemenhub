import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { UpdateDirektoratSchema } from '@/schemas';
import { DirektoratForm } from '@/features/direktorat/components/direktorat-form';
import { useEditDirektorat } from '../api/use-edit-direktorat';
import { useOpenDirektorat } from '../hooks/use-open-direktorat';
import { useGetDirektorat } from '../api/use-get-direktorat';
import { Loader2 } from 'lucide-react';


const formSchema = UpdateDirektoratSchema;

type FormValues = z.input<typeof formSchema>;

export default function EditDirektoratSheet() {
    const { isOpen, onClose, id } = useOpenDirektorat();

    const direktoratQuery = useGetDirektorat(id)
    const editMutation = useEditDirektorat(id!);

    const isPending = editMutation.isPending;
    const isLoading = direktoratQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = direktoratQuery.data ? {
        kode: direktoratQuery.data.kode,
        nama: direktoratQuery.data.nama,
        keterangan: direktoratQuery.data.keterangan
    } : {
        kode: "",
        nama: "",
        keterangan: null
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        Edit Direktorat
                    </SheetTitle>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <DirektoratForm
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
