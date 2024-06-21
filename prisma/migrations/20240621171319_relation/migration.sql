/*
  Warnings:

  - The primary key for the `asset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `asset` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pengadaan_id` on the `asset` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pengadaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_pengadaan` on the `pengadaan` table. All the data in the column will be lost.
  - You are about to drop the column `kode_pengadaan` on the `pengadaan` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `pengadaan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[no_pengadaan]` on the table `pengadaan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_pengadaan` to the `pengadaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `asset_direktorat_id_fkey`;

-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `asset_pengadaan_id_fkey`;

-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `asset_ruangan_id_fkey`;

-- DropForeignKey
ALTER TABLE `jenis_asset` DROP FOREIGN KEY `jenis_asset_kategori_asset_id_fkey`;

-- DropForeignKey
ALTER TABLE `jenis_asset` DROP FOREIGN KEY `jenis_asset_satuan_asset_id_fkey`;

-- DropForeignKey
ALTER TABLE `ruangan` DROP FOREIGN KEY `ruangan_direktorat_id_fkey`;

-- DropIndex
DROP INDEX `pengadaan_kode_pengadaan_key` ON `pengadaan`;

-- AlterTable
ALTER TABLE `asset` DROP PRIMARY KEY,
    ADD COLUMN `jenisAssetId` VARCHAR(191) NULL,
    ADD COLUMN `kategoriAssetId` VARCHAR(191) NULL,
    ADD COLUMN `satuanAssetId` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `spek` VARCHAR(191) NULL,
    MODIFY `keterangan` VARCHAR(191) NULL,
    MODIFY `ruangan_id` VARCHAR(191) NULL,
    MODIFY `direktorat_id` VARCHAR(191) NULL,
    MODIFY `pengadaan_id` INTEGER NULL,
    MODIFY `is_borrowed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_available` BOOLEAN NOT NULL DEFAULT true,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `jenis_asset` MODIFY `kategori_asset_id` VARCHAR(191) NULL,
    MODIFY `satuan_asset_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `pengadaan` DROP PRIMARY KEY,
    DROP COLUMN `jenis_pengadaan`,
    DROP COLUMN `kode_pengadaan`,
    ADD COLUMN `jenisPengadaanId` INTEGER NULL,
    ADD COLUMN `no_pengadaan` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `tujuan` VARCHAR(191) NULL,
    MODIFY `no_po` VARCHAR(191) NULL,
    MODIFY `invoice` VARCHAR(191) NULL,
    MODIFY `photo` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ruangan` MODIFY `direktorat_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pengadaan_no_pengadaan_key` ON `pengadaan`(`no_pengadaan`);

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_direktorat_id_fkey` FOREIGN KEY (`direktorat_id`) REFERENCES `direktorat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_asset` ADD CONSTRAINT `jenis_asset_satuan_asset_id_fkey` FOREIGN KEY (`satuan_asset_id`) REFERENCES `satuan_asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_asset` ADD CONSTRAINT `jenis_asset_kategori_asset_id_fkey` FOREIGN KEY (`kategori_asset_id`) REFERENCES `kategori_asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_kategoriAssetId_fkey` FOREIGN KEY (`kategoriAssetId`) REFERENCES `kategori_asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_jenisAssetId_fkey` FOREIGN KEY (`jenisAssetId`) REFERENCES `jenis_asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_satuanAssetId_fkey` FOREIGN KEY (`satuanAssetId`) REFERENCES `satuan_asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_direktorat_id_fkey` FOREIGN KEY (`direktorat_id`) REFERENCES `direktorat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_pengadaan_id_fkey` FOREIGN KEY (`pengadaan_id`) REFERENCES `pengadaan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengadaan` ADD CONSTRAINT `pengadaan_jenisPengadaanId_fkey` FOREIGN KEY (`jenisPengadaanId`) REFERENCES `jenis_pengadaan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
