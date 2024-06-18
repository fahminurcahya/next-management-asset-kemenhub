import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteDirektorat } from "@/features/direktorat/api/use-delete-direktorat";
import { useOpenDirektorat } from "@/features/direktorat/hooks/use-open-direktorat";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string
}

export const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Apa kamu yakin?",
        "Anda akan menghapus direktorat ini."
    )

    const { onOpen } = useOpenDirektorat();
    const deleteMutation = useDeleteDirektorat(id!);

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
                        onClick={() => onOpen(id)}>
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
