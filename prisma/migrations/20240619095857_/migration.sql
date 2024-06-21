/*
  Warnings:

  - You are about to drop the column `satuan` on the `jenis_asset` table. All the data in the column will be lost.
  - You are about to drop the `Ruangan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `satuan_barang` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `satuan_asset_id` to the `jenis_asset` table without a default value. This is not possible if the table is not empty.
  - Made the column `kategori_asset_id` on table `jenis_asset` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ruangan` DROP FOREIGN KEY `Ruangan_direktorat_id_fkey`;

-- DropForeignKey
ALTER TABLE `jenis_asset` DROP FOREIGN KEY `jenis_asset_kategori_asset_id_fkey`;

-- AlterTable
ALTER TABLE `jenis_asset` DROP COLUMN `satuan`,
    ADD COLUMN `satuan_asset_id` INTEGER NOT NULL,
    MODIFY `kategori_asset_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN', 'PIC', 'TEKNISI', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Ruangan`;

-- DropTable
DROP TABLE `satuan_barang`;

-- CreateTable
CREATE TABLE `ruangan` (
    `id` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `direktorat_id` VARCHAR(191) NOT NULL,
    `lokasi` VARCHAR(191) NULL,

    UNIQUE INDEX `ruangan_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `satuan_asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset` (
    `id` VARCHAR(191) NOT NULL,
    `kode_asset` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `merk` VARCHAR(191) NOT NULL,
    `spek` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `kondisi` VARCHAR(191) NOT NULL,
    `ruangan_id` VARCHAR(191) NOT NULL,
    `direktorat_id` VARCHAR(191) NOT NULL,
    `pengadaan_id` VARCHAR(191) NOT NULL,
    `is_borrowed` BOOLEAN NOT NULL,
    `is_available` BOOLEAN NOT NULL,

    UNIQUE INDEX `asset_kode_asset_key`(`kode_asset`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengadaan` (
    `id` VARCHAR(191) NOT NULL,
    `kode_pengadaan` VARCHAR(191) NOT NULL,
    `tgl_pengadaan` DATETIME(3) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,
    `no_po` VARCHAR(191) NOT NULL,
    `jenis_pengadaan` VARCHAR(191) NOT NULL,
    `invoice` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `pengadaan_kode_pengadaan_key`(`kode_pengadaan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_pengadaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_direktorat_id_fkey` FOREIGN KEY (`direktorat_id`) REFERENCES `direktorat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_asset` ADD CONSTRAINT `jenis_asset_satuan_asset_id_fkey` FOREIGN KEY (`satuan_asset_id`) REFERENCES `satuan_asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_asset` ADD CONSTRAINT `jenis_asset_kategori_asset_id_fkey` FOREIGN KEY (`kategori_asset_id`) REFERENCES `kategori_asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_direktorat_id_fkey` FOREIGN KEY (`direktorat_id`) REFERENCES `direktorat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_pengadaan_id_fkey` FOREIGN KEY (`pengadaan_id`) REFERENCES `pengadaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
