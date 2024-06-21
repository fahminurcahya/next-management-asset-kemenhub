import { db } from "@/lib/db"
import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator';
import { CreateKategoriAssetSchema, UpdateKategoriAssetSchema } from "@/schemas";
import { z } from "zod";
import { getKategoriAssetById, getKategoriAssetBykode } from "@/data/kategori-asset";
import { auth } from "@/auth";


const app = new Hono()
    .get(
        "/",
        async (c) => {
            const data = await db.kategoriAsset.findMany()
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

            const data = await getKategoriAssetById(id);

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
        zValidator("json", CreateKategoriAssetSchema),
        async (c) => {

            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const values = c.req.valid("json");
            const { kode } = values;
            const kategoriAsset = await getKategoriAssetBykode(kode);

            if (kategoriAsset) {
                return c.json({
                    error: "Duplicat Code"
                }, 409)
            }

            const data = await db.kategoriAsset.create({
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
            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const values = c.req.valid("json");

            const data = await db.kategoriAsset.deleteMany({
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
        zValidator("json", UpdateKategoriAssetSchema),
        async (c) => {
            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            const data = await db.kategoriAsset.update({
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
            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const data = await db.kategoriAsset.delete({
                where: {
                    id
                },
            })

            return c.json({ data })
        }
    )


export default app