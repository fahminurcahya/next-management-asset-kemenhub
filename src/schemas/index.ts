import * as z from 'zod';

export const CreateDirektoratSchema = z.object({
    kode: z.string().min(1).max(4),
    nama: z.string().min(1),
    keterangan: z.string().optional().nullable(),
})

export const UpdateDirektoratSchema = z.object({
    nama: z.string(),
    keterangan: z.string().optional().nullable(),
})


export const CreateRuanganSchema = z.object({
    kode: z.string().min(1).max(6),
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
    kode: z.string().min(1).max(3),
    nama: z.string().min(1),

})

export const UpdateKategoriAssetSchema = z.object({
    nama: z.string().min(1),
})


export const CreateJenisAssetSchema = z.object({
    kode: z.string().min(1).max(3),
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

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})

export const RequestPengadaanSchema = z.object({
    noPengadaan: z.string().min(1),
    tglPengadaan: z.coerce.date(),
    tujuan: z.string().optional().nullable(),
    noPo: z.string().optional().nullable(),
    jenisPengadaanId: z.union([z.number().min(1), z.string().min(1)]),
    invoice: z.string().optional().nullable(),
    photo: z.string().nullable().optional(),
    direktoratId: z.string().optional().nullable(),
    asset: z.array(
        z.object({
            kategoriAssetId: z.string().min(1),
            jenisAssetId: z.string().min(1),
            nama: z.string().min(1),
            merk: z.string().min(1),
            spek: z.string().optional().nullable(),
            keterangan: z.string().optional().nullable(),
            kondisi: z.enum(['BAIK', 'RUSAK']),
            ruanganId: z.string().optional().nullable(),
            qty: z.union([
                z.number().min(1),
                z.string().transform(
                    (val) => Number(val))
                    .refine((val) => !isNaN(val) && val >= 1, {
                        message: "Quantity must be a number and at least 1",
                    })]),
        })
    ),
})

export const CreateBulkAssetSchema = z.array(
    z.object({
        kategoriAssetId: z.string().min(1),
        jenisAssetId: z.string().min(1),
        nama: z.string().min(1),
        merk: z.string().min(1),
        spek: z.string().optional().nullable(),
        keterangan: z.string().optional().nullable(),
        kondisi: z.enum(['BAIK', 'RUSAK']),
        ruanganId: z.string().optional().nullable(),

    })
)

export const CreateAssetSchema = z.object({
    kategoriAssetId: z.string().min(1),
    jenisAssetId: z.string().min(1),
    nama: z.string().min(1),
    merk: z.string().min(1),
    spek: z.string(),
    keterangan: z.string(),
    kondisi: z.enum(['BAIK', 'RUSAK']),
    ruanganId: z.string().optional().nullable(),
    qty: z.union([
        z.number().min(1),
        z.string().transform(
            (val) => Number(val))
            .refine((val) => !isNaN(val) && val >= 1, {
                message: "Quantity must be a number and at least 1",
            })]),
})



