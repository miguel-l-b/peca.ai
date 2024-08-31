/*
  Warnings:

  - The primary key for the `Part` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Part` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `PartVehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PartVehicle` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `partId` on the `PartVehicle` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `vehicleId` on the `PartVehicle` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Part" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Part_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Part" ("barcode", "brandId", "createdAt", "deleted", "deletedAt", "id", "imageUrl", "name", "price", "stock", "updatedAt") SELECT "barcode", "brandId", "createdAt", "deleted", "deletedAt", "id", "imageUrl", "name", "price", "stock", "updatedAt" FROM "Part";
DROP TABLE "Part";
ALTER TABLE "new_Part" RENAME TO "Part";
CREATE UNIQUE INDEX "Part_barcode_key" ON "Part"("barcode");
CREATE TABLE "new_PartVehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "partId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PartVehicle_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PartVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PartVehicle" ("createdAt", "deleted", "deletedAt", "id", "partId", "updatedAt", "vehicleId") SELECT "createdAt", "deleted", "deletedAt", "id", "partId", "updatedAt", "vehicleId" FROM "PartVehicle";
DROP TABLE "PartVehicle";
ALTER TABLE "new_PartVehicle" RENAME TO "PartVehicle";
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "vehicleTypeId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "vehicleType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("brandId", "createdAt", "deleted", "deletedAt", "id", "imageUrl", "name", "updatedAt", "vehicleTypeId", "year") SELECT "brandId", "createdAt", "deleted", "deletedAt", "id", "imageUrl", "name", "updatedAt", "vehicleTypeId", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
