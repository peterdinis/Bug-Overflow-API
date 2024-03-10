/*
  Warnings:

  - Added the required column `downvote` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvote` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "downvote" INTEGER NOT NULL,
ADD COLUMN     "upvote" INTEGER NOT NULL;
