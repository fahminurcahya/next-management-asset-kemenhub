import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { CreateRuanganSchema } from '@/schemas';
import { useGetAllDirektorat } from '@/features/direktorat/api/use-get-all-direktorat';
import { useNewRuangan } from '../hooks/use-new-ruangan';
import { useCreateRuangan } from '../api/use-create-ruangan';
import { RuanganForm } from './ruangan-form';


const formSchema = CreateRuanganSchema;

type FormValues = z.input<typeof formSchema>;

export default function NewRuanganSheet() {
    const { isOpen, onClose } = useNewRuangan();
    const mutation = useCreateRuangan();

    const direktoratQuery = useGetAllDirektorat();

    const direktoratOptions = (direktoratQuery.data ?? []).map((direktorat) => ({
        label: direktorat.nama,
        value: direktorat.id,
    }))


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
                        Tambah Ruangan
                    </SheetTitle>
                </SheetHeader>
                <RuanganForm
                    onSubmit={onSubmit}
                    disable={mutation.isPending}
                    direktoratOptions={direktoratOptions}
                    defaultValues={{
                        kode: "",
                        nama: "",
                        direktoratId: "",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
