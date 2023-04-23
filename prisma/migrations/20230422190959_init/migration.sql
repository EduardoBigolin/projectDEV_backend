-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lunch" TEXT NOT NULL,
    "couserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassRoom_couserId_fkey" FOREIGN KEY ("couserId") REFERENCES "Couser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassRoom" ("couserId", "createdAt", "id", "lunch", "name", "updatedAt") SELECT "couserId", "createdAt", "id", "lunch", "name", "updatedAt" FROM "ClassRoom";
DROP TABLE "ClassRoom";
ALTER TABLE "new_ClassRoom" RENAME TO "ClassRoom";
CREATE UNIQUE INDEX "ClassRoom_name_key" ON "ClassRoom"("name");
CREATE TABLE "new_Couser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "educationLevelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Couser_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Couser" ("createdAt", "educationLevelId", "id", "name", "updatedAt") SELECT "createdAt", "educationLevelId", "id", "name", "updatedAt" FROM "Couser";
DROP TABLE "Couser";
ALTER TABLE "new_Couser" RENAME TO "Couser";
CREATE UNIQUE INDEX "Couser_name_key" ON "Couser"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
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
