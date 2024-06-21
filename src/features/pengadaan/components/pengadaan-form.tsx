

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAssetSchema } from "@/schemas";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { ChevronLeft, PlusCircle, Trash, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
import { useNewAsset } from "../hooks/use-new-asset";
import { useCreatePengadaan } from "../api/use-create-pengadaan";


const assetSchema = CreateAssetSchema

const formSchema = z.object({
    noPengadaan: z.string().min(1),
    tglPengadaan: z.coerce.date(),
    tujuan: z.string().optional(),
    noPo: z.string().optional(),
    jenisPengadaanId: z.union([z.number().min(1), z.string().min(1)]),
    invoice: z.string().optional(),
    photo: z.string().nullable().optional(),
    direktoratId: z.string().optional().nullable(),
    asset: z.array(assetSchema).min(1),
})
type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onDelete?: () => void;
    direktoratOptions: { label: string, value: string }[],
    ruanganOptions: { label: string, value: string }[],
    jenisPengadaanOptions: { label: string, value: string }[],
    ketegoriAssetOptions: { label: string, value: string }[],
    jenisAssetOptions: { label: string, value: string }[],
    kondisiOptions: { label: string, value: string }[],
    disable?: boolean;
    onCancelCreate: () => void
};


export function PengadaanForm({
    defaultValues,
    direktoratOptions,
    ruanganOptions,
    disable,
    jenisPengadaanOptions,
    ketegoriAssetOptions,
    jenisAssetOptions,
    kondisiOptions,
    onCancelCreate
}: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const { errors } = form.formState;

    const { control } = form

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    const mutation = useCreatePengadaan();


    const onSubmit = (values: FormValues) => {
        // console.log(values)
        mutation.mutate(values, {
            onSuccess: () => {

            }
        });
    }

    const { onOpen, data } = useNewAsset();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "asset", // Nama dari field array di dalam formValues
    });


    useEffect(() => {
        if (data != undefined) {
            append(data);
        }
    }, [data]);

    const handleRemoveAsset = (index: number) => {
        remove(index);
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >

                <div className="mx-auto grid max-w-[100rem] flex-1 auto-rows-max gap-4">

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="h-7 w-7" type="button" onClick={onCancelCreate}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Pengadaan
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button variant="outline" size="sm" type="button" onClick={onCancelCreate}>
                                Discard
                            </Button>
                            <Button size="sm">Save Product</Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Pengadaan Detail</CardTitle>
                                    <CardDescription>
                                        Isi data berikut
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8" >
                                    <FormField
                                        name="noPengadaan"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    No Pengadaan
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-slate-200"
                                                        disabled={true}
                                                        placeholder="No Pengadaan"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="tglPengadaan"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tanggal
                                                </FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={disable}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="tujuan"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tujuan
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={disable}
                                                        placeholder="Tujuan"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="noPo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    No PO
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={disable}
                                                        placeholder="No PO"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="jenisPengadaanId"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Jenis Pengadaan
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        placeholder="Pilih jenis pengadaan"
                                                        options={jenisPengadaanOptions}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={disable}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="invoice"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Invoice
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={disable}
                                                        placeholder="Invoice"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Lokasi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        name="direktoratId"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Direktorat
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        placeholder="Pilih direktorat"
                                                        options={direktoratOptions}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={fields.length > 0 ? true : false}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>
                        </div>

                    </div>
                    <div className="overflow-x-auto">
                        <Card x-chunk="dashboard-07-chunk-1 ">
                            <CardHeader>
                                <CardTitle>Asset</CardTitle>
                                <CardDescription>
                                    Masukan asset
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table className="whitespace-nowrap table-auto">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead >#</TableHead>
                                            <TableHead className="min-w-[200px]">Kategori Asset</TableHead>
                                            <TableHead className="min-w-[200px]">Jenis Asset</TableHead>
                                            <TableHead className="min-w-[200px]">Nama</TableHead>
                                            <TableHead className="min-w-[200px]">Merk</TableHead>
                                            <TableHead className="min-w-[200px]">Spek</TableHead>
                                            <TableHead className="min-w-[200px]">Ruangan</TableHead>
                                            <TableHead className="min-w-[200px]">Keterangan</TableHead>
                                            <TableHead className="min-w-[200px]">Kondisi</TableHead>
                                            <TableHead className="min-w-[200px]">Qty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fields.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveAsset(index)}
                                                        type="button">
                                                        <Trash2 />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.kategoriAssetId`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>

                                                                <FormControl>
                                                                    <Select
                                                                        placeholder="Pilih kategori"
                                                                        options={ketegoriAssetOptions}
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        disabled={true}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.jenisAssetId`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>

                                                                <FormControl>
                                                                    <Select
                                                                        options={jenisAssetOptions}
                                                                        placeholder="Pilih jenis asset"
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        disabled={true}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.nama`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="Nama" {...field}
                                                                        style={{
                                                                            border: errors.asset?.[index]?.nama ? '1px solid red' : '1px solid #ccc'
                                                                        }} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.merk`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="merk"
                                                                        style={{
                                                                            border: errors.asset?.[index]?.merk ? '1px solid red' : '1px solid #ccc'
                                                                        }} {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.spek`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="spek"
                                                                        style={{
                                                                            border: errors.asset?.[index]?.spek ? '1px solid red' : '1px solid #ccc'
                                                                        }}{...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.ruanganId`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        options={ruanganOptions}
                                                                        placeholder="Ruangan"
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        disabled={true}
                                                                        isDocumentBody={true}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.keterangan`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="keterangan"
                                                                        style={{
                                                                            border: errors.asset?.[index]?.keterangan ? '1px solid red' : '1px solid #ccc'
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.kondisi`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        options={kondisiOptions}
                                                                        placeholder="Kondisi asset"
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        isDocumentBody={true}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>


                                                <TableCell>
                                                    <FormField
                                                        name={`asset.${index}.qty`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="qty"
                                                                        type="number"
                                                                        style={{
                                                                            border: errors.asset?.[index]?.qty ? '1px solid red' : '1px solid #ccc'
                                                                        }} {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" type="button" variant="ghost" className="gap-1" onClick={() => onOpen(form.getValues("direktoratId")!)}>
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Asset
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button variant="outline" size="sm" type="button" onClick={onCancelCreate}>
                            Discard
                        </Button>
                        <Button type="submit" size="sm">Save Product</Button>
                    </div>
                </div>
            </form>
        </Form >
    )
}

