/*
  Warnings:

  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Choice`;

-- CreateTable
CREATE TABLE `choice` (
    `id` VARCHAR(191) NOT NULL,
    `choice1` CHAR(255) NOT NULL,
    `choice2` CHAR(255) NOT NULL,
    `counter1` INTEGER NOT NULL DEFAULT 0,
    `counter2` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
