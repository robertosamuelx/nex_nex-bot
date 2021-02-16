-- CreateTable
CREATE TABLE `AskAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ask` VARCHAR(191),
    `answer` VARCHAR(191),
    `isOrder` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
