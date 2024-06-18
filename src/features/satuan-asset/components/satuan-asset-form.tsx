

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateSatuanAssetSchema } from "@/schemas";


const formSchema = CreateSatuanAssetSchema;

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string | number;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disable?: boolean;
};

export function SatuanAssetForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
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


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
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
                <Button className="w-full" disabled={disable}>
                    {id ? "Save Changes" : "Create satuan asset"}
                </Button>
            </form>
        </Form>
    )
}

