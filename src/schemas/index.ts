import * as z from 'zod';

export const CreateDirektoratSchema = z.object({
    kode: z.string().min(1),
    nama: z.string().min(1),
    keterangan: z.string().optional().nullable(),
})

export const UpdateDirektoratSchema = z.object({
    nama: z.string(),
    keterangan: z.string().optional().nullable(),
})


export const CreateRuanganSchema = z.object({
    kode: z.string().min(1),
    nama: z.string().min(1),
    direktoratId: z.string().min(1),
    lokasi: z.string().optional().nullable(),
})

export const UpdateRuanganSchema = z.object({
    nama: z.string().min(1),
    direktoratId: z.string().min(1),
    lokasi: z.string().optional().nullable(),
})


export const CreateKategoriAssetSchema = z.object({
    kode: z.string().min(1),
    nama: z.string().min(1),

})

export const UpdateKategoriAssetSchema = z.object({
    nama: z.string().min(1),
})


export const CreateJenisAssetSchema = z.object({
    kode: z.string().min(1),
    nama: z.string().min(1),
    satuanAssetId: z.union([z.number().min(1), z.string().min(1)]),
    kategoriAssetId: z.string().min(1),
    keterangan: z.string().optional().nullable(),
})

export const UpdateJenisAssetSchema = z.object({
    nama: z.string().min(1),
    satuanAssetId: z.union([z.number().min(1), z.string().min(1)]),
    kategoriAssetId: z.string().min(1),
    keterangan: z.string().optional().nullable(),
})

export const CreateSatuanAssetSchema = z.object({
    nama: z.string().min(1),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
})


