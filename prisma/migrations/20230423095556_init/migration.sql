-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "isActived" BOOLEAN NOT NULL,
    "photoFile" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("classId", "createdAt", "dateOfBirth", "email", "id", "isActived", "isAdmin", "name", "password", "photoFile", "updatedAt") SELECT "classId", "createdAt", "dateOfBirth", "email", "id", "isActived", "isAdmin", "name", "password", "photoFile", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
