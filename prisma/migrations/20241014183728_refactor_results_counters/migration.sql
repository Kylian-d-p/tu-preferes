/*
  Warnings:

  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_choiceId_fkey`;

-- AlterTable
ALTER TABLE `Choice` ADD COLUMN `counter1` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `counter2` INTEGER NOT NULL DEFAULT 0,
    MODIFY `choice1` CHAR(255) NOT NULL,
    MODIFY `choice2` CHAR(255) NOT NULL;

-- DropTable
DROP TABLE `Result`;
