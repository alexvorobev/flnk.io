/*
  Warnings:

  - You are about to drop the column `ip` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `city` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "ip";
