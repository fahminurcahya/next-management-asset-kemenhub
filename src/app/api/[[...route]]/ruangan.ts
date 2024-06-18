import { db } from "@/lib/db"
import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator';
import { CreateRuanganSchema, UpdateRuanganSchema } from "@/schemas";
import { z } from "zod";
import { getRuanganById, getRuanganByKode } from "@/data/ruangan";


const app = new Hono()
    .get(
        "/",
        async (c) => {
            const data = await db.ruangan.findMany({
                include: {
                    direktorat: true,
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

            const data = await getRuanganById(id);

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
        zValidator("json", CreateRuanganSchema),
        async (c) => {

            const values = c.req.valid("json");
            const { kode } = values;
            const ruangan = await getRuanganByKode(kode);

            if (ruangan) {
                return c.json({
                    error: "Duplicat Code"
                }, 409)
            }

            const data = await db.ruangan.create({
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

            const data = await db.ruangan.deleteMany({
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
        zValidator("json", UpdateRuanganSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            const data = await db.ruangan.update({
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

            const data = await db.ruangan.delete({
                where: {
                    id
                },
            })

            return c.json({ data })
        }
    )


export default app