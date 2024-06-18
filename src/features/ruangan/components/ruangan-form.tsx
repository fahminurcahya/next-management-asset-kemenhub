

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateRuanganSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/select";


const formSchema = CreateRuanganSchema;

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    direktoratOptions: { label: string, value: string }[],
    disable?: boolean;
};

export function RuanganForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    direktoratOptions,
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
                    name="direktoratId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Direktorat
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an direktorat"
                                    options={direktoratOptions}
                                    // onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disable}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="lokasi"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Lokasi
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disable}
                                    placeholder="Lokasi optional"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disable}>
                    {id ? "Save Changes" : "Create ruangan"}
                </Button>
            </form>
        </Form>
    )
}

