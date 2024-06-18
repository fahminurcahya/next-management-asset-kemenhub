import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteSatuanAsset } from "@/features/satuan-asset/api/use-delete-satuan-asset";
import { useOpenSatuanAsset } from "@/features/satuan-asset/hooks/use-open-satuan-asset";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: number
}

export const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Apa kamu yakin?",
        "Anda akan menghapus satuan ini."
    )

    const { onOpen } = useOpenSatuanAsset();
    const deleteMutation = useDeleteSatuanAsset(id!.toString());

    const handleDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate();
        }
    }

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
                        disabled={deleteMutation.isPending}
                        className="cursor-pointer"
                        onClick={() => onOpen(id.toString())}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        className="cursor-pointer"
                        onClick={handleDelete}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}
