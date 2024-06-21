import { db } from "@/lib/db"
import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator';
import { RequestPengadaanSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";
import { generateNextCode, getJenisPengadaan, getPengadaanById, getSatuanAsset } from "@/data/pengadaan";
import { randomUUID } from "crypto";

type CreateAssetSchema = {
    kodeAsset: string,
    nama: string,
    merk: string,
    kategoriAssetId: string,
    jenisAssetId: string,
    spek: string | null | undefined,
    keterangan: string | null | undefined,
    kondisi: string,
    ruanganId: string | null | undefined,
    direktoratId: string | null | undefined
    isAvailable: boolean | true
};

const app = new Hono()
    .get(
        "/",
        async (c) => {
            const data = await db.pengadaan.findMany()
            return c.json({
                data
            })
        })
    .get(
        "/next-code",
        async (c) => {
            const code = await generateNextCode();
            return c.json({
                code
            })
        })
    .get(
        "/jenis-pengadaan",
        async (c) => {
            const data = await getJenisPengadaan();
            return c.json({
                data
            })
        })
    .post(
        "/",
        zValidator("json", RequestPengadaanSchema),
        async (c) => {

            // const session = await auth();

            // if (!session) {
            //     return c.json({ error: "Unauthorized" }, 401);
            // }

            const values = c.req.valid("json");

            const assetsData = values.asset;
            const totalQty = assetsData.reduce((acc, asset) => acc + asset.qty, 0);

            const newAssetsData: CreateAssetSchema[] = assetsData.flatMap((asset, index): CreateAssetSchema[] => {

                const assetsArray: CreateAssetSchema[] = Array.from({ length: asset.qty }, (__, i) => ({
                    kodeAsset: randomUUID(),
                    nama: asset.nama,
                    merk: asset.merk,
                    kategoriAssetId: asset.kategoriAssetId,
                    jenisAssetId: asset.jenisAssetId,
                    spek: asset.spek,
                    kondisi: asset.kondisi,
                    keterangan: asset.keterangan,
                    ruanganId: asset.ruanganId,
                    direktoratId: values.direktoratId ? values.direktoratId : null,
                    isAvailable: values.direktoratId ? false : true
                }));

                return assetsArray;
            });


            const data = await db.pengadaan.create({
                data: {
                    noPengadaan: values.noPengadaan,
                    tglPengadaan: values.tglPengadaan,
                    tujuan: values.tujuan,
                    noPo: values.noPo,
                    jenisPengadaanId: +values.jenisPengadaanId,
                    invoice: values.invoice,
                    photo: values.photo,
                    qty: totalQty,
                    Assets: {
                        create: newAssetsData
                    }

                }
            })

            return c.json({
                data
            })
        })

    .get(
        "/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        async (c) => {
            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const data = await getPengadaanById(+id);

            if (!data) {
                return c.json({
                    error: "Not found"
                }, 404)
            }
            return c.json({ data })
        }

    )


export default app