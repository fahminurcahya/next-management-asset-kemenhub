"use client"

import EditDirektoratSheet from "@/features/direktorat/components/edit-direktorat-sheet";
import NewDirektoratSheet from "@/features/direktorat/components/new-direktorat-sheet";
import EditJenisAssetSheet from "@/features/jenis-asset/components/edit-jenis-asset-sheet";
import NewJenisAssetSheet from "@/features/jenis-asset/components/new-jenis-asset-sheet";
import EditKategoriAssetSheet from "@/features/kategori-asset/components/edit-kategori-asset-sheet";
import NewKategoriAssetSheet from "@/features/kategori-asset/components/new-kategori-asset-sheet";
import NewAssetSheet from "@/features/pengadaan/components/new-asset-sheet";
import EditRuanganSheet from "@/features/ruangan/components/edit-ruangan-sheet";
import NewRuanganSheet from "@/features/ruangan/components/new-ruangan-sheet";
import EditSatuanAssetSheet from "@/features/satuan-asset/components/edit-direktorat-sheet";
import NewSatuanAssetSheet from "@/features/satuan-asset/components/new-direktorat-sheet";
import { useMountedState } from "react-use";

export default function SheetProvider() {
    const isMounted = useMountedState();
    if (!isMounted) return null;
    return (
        <>
            <NewDirektoratSheet />
            <EditDirektoratSheet />
            <NewRuanganSheet />
            <EditRuanganSheet />
            <NewKategoriAssetSheet />
            <EditKategoriAssetSheet />
            <NewJenisAssetSheet />
            <EditJenisAssetSheet />
            <NewSatuanAssetSheet />
            <EditSatuanAssetSheet />
            <NewAssetSheet />
        </>
    )
}