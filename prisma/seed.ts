import { PrismaClient } from '@prisma/client'
import bycript from 'bcryptjs';

const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: await bycript.hash('admin', 10),
            role: 'ADMIN'
        },
    })
    const pic = await prisma.user.upsert({
        where: { email: 'pic@gmail.com' },
        update: {},
        create: {
            email: 'pic@gmail.com',
            name: 'PIC',
            password: await bycript.hash('pic', 10),
            role: 'PIC'
        },
    })
    const teknisi = await prisma.user.upsert({
        where: { email: 'teknisi@gmail.com' },
        update: {},
        create: {
            email: 'teknisi@gmail.com',
            name: 'Teknisi',
            password: await bycript.hash('teknisi', 10),
            role: 'TEKNISI'
        },
    })
    const user = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            email: 'user@gmail.com',
            name: 'User',
            password: await bycript.hash('user', 10),
        },
    })

    const jenisPengadaan = await prisma.jenisPengadaan.createMany({
        data: [{ nama: 'Pembelian baru' }, { nama: 'Pembelian pengganti' }, { nama: 'Wakaf' }, { nama: 'Sumbangan' }, { nama: 'Existing' }],
    })

    const satuanAsset = await prisma.satuanAsset.createMany({
        data: [{ nama: 'Unit' }, { nama: 'Buah' }, { nama: 'Set' }],
    })

    console.log({ admin, pic, teknisi, user, jenisPengadaan, satuanAsset })
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })