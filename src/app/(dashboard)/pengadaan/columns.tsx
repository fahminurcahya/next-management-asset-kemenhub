"use client"

import { Button } from "@/components/ui/button"
import { client } from "@/lib/hono"
import { ColumnDef } from "@tanstack/react-table"
import { InferResponseType } from "hono"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ResponseType = InferResponseType<typeof client.api.pengadaan.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
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
        accessorKey: "tglPengadaan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"

                >
                    Tanggal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("tglPengadaan") as Date
            return (
                <span>
                    {format(date, "dd MMM yyyy")}
                </span>
            )
        }

    },
    {
        accessorKey: "noPengadaan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"

                >
                    No Pengadaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }

    },
    {
        accessorKey: "noPo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"

                >
                    No Seri Pembelian
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const noPo = row.getValue("noPo");
            return (<>
                {
                    noPo
                        ? <>
                            {row.original.noPo}
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
        accessorKey: "tujuan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"

                >
                    Keterangan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const tujuan = row.getValue("tujuan");
            return (<>
                {
                    tujuan
                        ? <>
                            {row.original.tujuan}
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
        accessorKey: "qty",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="ps-0"

                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }

    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => <Actions id={row.original.id} />
    // }
]
