import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import direktorat from './direktorat';
import ruangan from './ruangan';
import kategoriAsset from './kategori-asset';
import satuanAsset from './satuan-asset';
import jenisAsset from './jenis-asset';
import user from './user';
import pengadaan from './pengadaan';
import asset from './asset';



import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


const app = new Hono().basePath('/api')

app.onError((err, c) => {
    if (err instanceof PrismaClientKnownRequestError) {
        return c.json({ error: err }, 404)
    }

    return c.json({ error: err }, 500)
})



const routes = app
    .route("/direktorat", direktorat)
    .route("/ruangan", ruangan)
    .route("/jenis-asset", jenisAsset)
    .route("/kategori-asset", kategoriAsset)
    .route("/satuan-asset", satuanAsset)
    .route("/user", user)
    .route("/pengadaan", pengadaan)
    .route("/asset", asset)





export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;

