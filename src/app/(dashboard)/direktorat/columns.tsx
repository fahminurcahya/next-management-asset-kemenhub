"use client"

import { Button } from "@/components/ui/button"
import { client } from "@/lib/hono"
import { ColumnDef } from "@tanstack/react-table"
import { InferResponseType } from "hono"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./action"


export type ResponseType = InferResponseType<typeof client.api.direktorat.$get, 200>["data"][0];


export const columns: ColumnDef<ResponseType>[] = [
    {
        accessorKey: "kode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kode
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Keterangan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <Actions id={row.original.id} />
    }
]
