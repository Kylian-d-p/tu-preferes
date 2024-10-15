-- AddForeignKey
ALTER TABLE `playlist_choice` ADD CONSTRAINT `playlist_choice_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `choice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlist_choice` ADD CONSTRAINT `playlist_choice_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
