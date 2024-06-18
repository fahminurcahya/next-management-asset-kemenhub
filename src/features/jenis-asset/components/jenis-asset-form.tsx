

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateJenisAssetSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/select";


const formSchema = CreateJenisAssetSchema;

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    kategoriAssetOptions: { label: string, value: string }[],
    satuanAssetOptions: { label: string, value: string }[],
    onCreateSatuanAsset?: (value: string) => void
    disable?: boolean;
};

export function JenisAssetForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    kategoriAssetOptions,
    satuanAssetOptions,
    onCreateSatuanAsset,
    disable,
}: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    const handleDelete = () => {
        onDelete?.();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        event.target.value = value.replace(/\s/g, '').toUpperCase();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="kode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kode
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={id ? true : disable}
                                    placeholder="Kode"
                                    onInput={handleInputChange}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="nama"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nama
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disable}
                                    placeholder="Nama"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="kategoriAssetId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kategori Asset
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an kategori asset"
                                    options={kategoriAssetOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disable}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="satuanAssetId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Satuan Asset
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an satuan asset"
                                    options={satuanAssetOptions}
                                    onCreate={onCreateSatuanAsset}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disable}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="keterangan"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Keterangan
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disable}
                                    placeholder="Keterangan optional"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disable}>
                    {id ? "Save Changes" : "Create Jenis Asset"}
                </Button>
            </form>
        </Form>
    )
}

