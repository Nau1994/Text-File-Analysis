-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "file-id" TEXT NOT NULL,
    "file-name" TEXT NOT NULL,
    "file-path" TEXT NOT NULL,
    "availabe-words" TEXT[],
    "upload-time" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "file-id" TEXT NOT NULL,
    "task-id" TEXT NOT NULL,
    "count-words" INTEGER NOT NULL,
    "count-unique-words" INTEGER NOT NULL,
    "find-top-kwords" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "files_id_key" ON "files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "tasks"("id");
