-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `choice1` VARCHAR(191) NOT NULL,
    `choice2` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `choiceId` INTEGER NOT NULL,
    `winner` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
