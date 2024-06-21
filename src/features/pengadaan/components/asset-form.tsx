

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAssetSchema, CreateRuanganSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/select";
import { ScrollArea } from "@/components/ui/scroll-area";


const formSchema = CreateAssetSchema;

type FormValues = z.input<typeof formSchema>;

type Props = {
    direktoratId?: string,
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    disable?: boolean;
    jenisAssetIsloading?: boolean
    ruanganOptions: { label: string, value: string }[],
    ketegoriAssetOptions: { label: string, value: string }[],
    jenisAssetOptions: { label: string, value: string }[],
    kondisiOptions: { label: string, value: string }[],
    onSelectedKategori: (value?: string) => void;
};

export function AssetForm({
    direktoratId,
    defaultValues,
    onSubmit,
    disable,
    jenisAssetIsloading,
    ruanganOptions,
    ketegoriAssetOptions,
    jenisAssetOptions,
    kondisiOptions,
    onSelectedKategori
}: Props) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <ScrollArea className="h-screen pb-20 -ml-2 -mr-2 border">

                <form onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4 pt-4 pl-2 pr-2"
                >
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
                                        placeholder="Pilih ketegori .."
                                        options={ketegoriAssetOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        handleChange={onSelectedKategori}
                                        disabled={disable}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="jenisAssetId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Jenis Asset
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Pilih jenis asset .."
                                        options={jenisAssetOptions}
                                        isLoading={jenisAssetIsloading}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disable}
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
                        name="merk"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Merk
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disable}
                                        placeholder="merk"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="spek"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Spek
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disable}
                                        placeholder="spek"
                                        {...field}
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
                                    <Input
                                        disabled={disable}
                                        placeholder="keterangan"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {direktoratId && <FormField
                        name="ruanganId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Ruangan
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Select a ruangan"
                                        options={ruanganOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disable}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />}

                    <FormField
                        name="kondisi"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Satuan
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Pilih .."
                                        options={kondisiOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disable}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="qty"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Quantity
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disable}
                                        type="number"
                                        placeholder="qty"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <Button className="w-full" disabled={disable}>
                        Add asset
                    </Button>
                </form>
            </ScrollArea>

        </Form>

    )
}

