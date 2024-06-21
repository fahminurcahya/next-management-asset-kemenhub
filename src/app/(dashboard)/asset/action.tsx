import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteRuangan } from "@/features/ruangan/api/use-delete-ruangan";
import { useOpenRuangan } from "@/features/ruangan/hooks/use-open-ruangan";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string
}

export const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Apa kamu yakin?",
        "Anda akan menghapus asset ini."
    )

    // const deleteMutation = useDeleteAsset(id!);

    // const handleDelete = async () => {
    //     const ok = await confirm()
    //     if (ok) {
    //         deleteMutation.mutate();
    //     }
    // }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={false}
                        className="cursor-pointer"
                        onClick={() => { }}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={false}
                        className="cursor-pointer"
                        onClick={() => { }}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}
