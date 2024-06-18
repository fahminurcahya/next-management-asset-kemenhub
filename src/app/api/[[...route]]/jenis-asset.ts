import { db } from "@/lib/db"
import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator';
import { CreateJenisAssetSchema, UpdateJenisAssetSchema } from "@/schemas";
import { z } from "zod";
import { getJenisAssetById, getJenisAssetBykode } from "@/data/jenis-asset";


const app = new Hono()
    .get(
        "/",
        async (c) => {
            const data = await db.jenisAsset.findMany({
                include: {
                    kategoriAsset: true,
                    satuan: true,
                },
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

            const data = await getJenisAssetById(id);

            if (!data) {
                return c.json({
                    error: "Not found"
                }, 404)
            }
            return c.json({ data })
        }

    )
    .post(
        "/",
        zValidator("json", CreateJenisAssetSchema),
        async (c) => {

            const body = c.req.valid("json");
            const { kode } = body;
            const jenisAsset = await getJenisAssetBykode(kode);
            const values = {
                ...body,
                satuanAssetId: +body.satuanAssetId
            }

            if (jenisAsset) {
                return c.json({
                    error: "Duplicat Code"
                }, 409)
            }

            const data = await db.jenisAsset.create({
                data: values
            })

            return c.json({
                data
            })
        })
    .post(
        "/bulk-delete",
        zValidator(
            "json",
            z.object({
                ids: z.array(z.string()),
            }),
        ),
        async (c) => {
            const values = c.req.valid("json");

            const data = await db.jenisAsset.deleteMany({
                where: {
                    id: { in: values.ids },
                }
            });

            return c.json({ data })
        }
    )
    .patch(
        "/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        zValidator("json", UpdateJenisAssetSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const body = c.req.valid("json");
            const values = {
                ...body,
                satuanAssetId: +body.satuanAssetId
            }

            const data = await db.jenisAsset.update({
                where: {
                    id
                },
                data: values,
            })

            if (!data) {
                return c.json({ error: "Not found" }, 404)
            }

            return c.json({ data })
        }
    )
    .delete(
        "/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        async (c) => {
            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const data = await db.jenisAsset.delete({
                where: {
                    id
                },
            })

            return c.json({ data })
        }
    )


export default app