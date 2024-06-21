import { db } from "@/lib/db"
import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator';
import { RegisterSchema } from "@/schemas";
import bycript from 'bcryptjs';
import { z } from "zod";
import { getUserByEmail, getUserById } from "@/data/user";
import { auth } from "@/auth";



const app = new Hono()
    .get(
        "/",
        async (c) => {
            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 400);
            }

            const data = await db.user.findMany()
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
            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 400);
            }

            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const data = await getUserById(id);

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
        zValidator("json", RegisterSchema),
        async (c) => {

            const session = await auth();

            if (!session) {
                return c.json({ error: "Unauthorized" }, 400);
            }

            const values = c.req.valid("json");
            const { email, password, name } = values;
            const user = await getUserByEmail(email);

            const hashedPassword = await bycript.hash(password, 10);

            if (user) {
                return c.json({
                    error: "Duplicat Code"
                }, 409)
            }

            const data = await db.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })

            return c.json({
                data
            })
        })


export default app