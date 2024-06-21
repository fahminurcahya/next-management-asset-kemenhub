"use client"

import { Button } from "@/components/ui/button"
import { client } from "@/lib/hono"
import { ColumnDef } from "@tanstack/react-table"
import { InferResponseType } from "hono"
import { ArrowUpDown, TriangleAlert } from "lucide-react"
import { Actions } from "./action"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"


export type ResponseType = InferResponseType<typeof client.api.asset.$get, 200>["data"][0];


export const columns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        // Row number column
        id: 'rowNumber',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"
                >
                    No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <span>{row.index + 1}</span>,
    },

    {
        accessorKey: "kodeAsset",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    No Asset
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
        accessorKey: "merk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Merk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "kategoriAsset.nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kategori
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "jenisAsset.nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jenis Asset
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "kondisi",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kondisi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge
                    variant={row.original?.kondisi === "BAIK" ? "success" : "destructive"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {row.original?.kondisi}
                </Badge>
            )
        },

    },
    {
        accessorKey: "isAvailable",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isAvailable = row.getValue("isAvailable");
            return (
                <Badge
                    variant={isAvailable ? "success" : "primary"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {isAvailable ? "Tersedia" : "Ditempatkan"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "direktorat.nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Direktorat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge
                    variant={row.original?.direktorat ? "primary" : "destructive"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {row.original.direktorat ? <>
                        {row.original?.direktorat?.nama}
                    </> : <>
                        <TriangleAlert className="mr-2 size-4 shrink-0" />
                        Belum ditempatkan
                    </>
                    }
                </Badge>
            )
        },
    },
    {
        accessorKey: "ruangan.nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ruangan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge
                    variant={row.original?.ruangan ? "primary" : "destructive"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {row.original.ruangan ? <>
                        {row.original?.ruangan?.nama}
                    </> : <>
                        <TriangleAlert className="mr-2 size-4 shrink-0" />
                        Belum ditempatkan
                    </>
                    }
                </Badge>
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
        cell: ({ row }) => {
            const keterangan = row.getValue("keterangan");
            return (<>
                {
                    keterangan
                        ? <>
                            {row.original.keterangan}
                        </>
                        : <Badge
                            variant="secondary"
                            className="text-xs font-medium "
                        >
                            -
                        </Badge>

                }
            </>

            )
        },
    },
    {
        accessorKey: "spek",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    spek
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const spek = row.getValue("spek");
            return (<>
                {
                    spek
                        ? <>
                            {row.original.spek}
                        </>
                        : <Badge
                            variant="secondary"
                            className="text-xs font-medium "
                        >
                            -
                        </Badge>

                }
            </>

            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <Actions id={row.original.id.toString()} />
    }
]
