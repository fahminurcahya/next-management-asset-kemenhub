import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react';
import { z } from 'zod';
import { UpdateRuanganSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import { RuanganForm } from './ruangan-form';
import { useOpenRuangan } from '../hooks/use-open-ruangan';
import { useGetRuangan } from '../api/use-get-ruangan';
import { useEditRuangan } from '../api/use-edit-ruangan';
import { useGetAllDirektorat } from '@/features/direktorat/api/use-get-all-direktorat';


const formSchema = UpdateRuanganSchema;

type FormValues = z.input<typeof formSchema>;

export default function EditRuanganSheet() {
    const { isOpen, onClose, id } = useOpenRuangan();

    const ruanganQuery = useGetRuangan(id)
    const editMutation = useEditRuangan(id!);

    const direktoratQuery = useGetAllDirektorat();

    const direktoratOptions = (direktoratQuery.data ?? []).map((direktorat) => ({
        label: direktorat.nama,
        value: direktorat.id,
    }))

    const isPending = editMutation.isPending;
    const isLoading = ruanganQuery.isLoading || direktoratQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = ruanganQuery.data ? {
        kode: ruanganQuery.data.kode,
        nama: ruanganQuery.data.nama,
        lokasi: ruanganQuery.data.lokasi,
        direktoratId: ruanganQuery.data.direktoratId
    } : {
        kode: "",
        nama: "",
        lokasi: null,
        direktoratId: ""
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
                        <RuanganForm
                            id={id}
                            onSubmit={onSubmit}
                            disable={isPending}
                            direktoratOptions={direktoratOptions}
                            defaultValues={defaultValues}
                        />
                    )
                }


            </SheetContent>
        </Sheet>
    )
}
