import { Hono } from 'hono';
import { z } from 'zod';
import { subDays, parse } from 'date-fns';
import { zValidator } from '@hono/zod-validator';
import { db } from '@/lib/db';
import { getSumAssetByRuanganId } from '@/data/asset';


const app = new Hono()
    .get(
        "/",
        zValidator("query", z.object({
            status: z.string().optional(),
            kondisi: z.string().optional(),
            ruanganId: z.string().optional(),
            direktoratId: z.string().optional(),
        })),
        async (c) => {
            const { status, kondisi, ruanganId, direktoratId } = c.req.valid("query");

            const isAvailable = status?.toUpperCase();
            const kondisiAsset = kondisi?.toUpperCase()

            const where: any = {};

            // Add conditions to the where object if they are provided
            if (isAvailable == "true") {
                where.isAvailable = true
            } else if (isAvailable == "false") {
                where.isAvailable = false
            }

            kondisiAsset && (where.kondisi = kondisiAsset)
            ruanganId && (where.ruanganId = ruanganId)
            direktoratId && (where.direktoratId = direktoratId)

            const data = await db.assets.findMany({
                include: {
                    direktorat: true,
                    ruangan: true,
                    kategoriAsset: true,
                    jenisAsset: {
                        include: {
                            satuan: true
                        }
                    }
                },
                where: where

            })
            return c.json({
                data
            })
        })

    .get(
        "kondisi/:id/ruangan",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        async (c) => {

            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const data = await getSumAssetByRuanganId(id, "BAIK");

            return c.json({
                data
            })
        }

    )




export default app;