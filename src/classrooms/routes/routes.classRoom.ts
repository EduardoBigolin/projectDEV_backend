import { Router } from "express";
import {
  AlterClassRoom,
  DeleteClassRoom,
  ReadClassRoom,
  createClassRoom,
} from "../controller/Classroom/";
import Auth from "../../infra/middleware/auth";

const ClassRoomRoutes = Router();

// EDUCATION LEVEL ROUTES
ClassRoomRoutes.get("/", ReadClassRoom.all)
  .get("/:id", Auth, ReadClassRoom.unique)
  .post("/create/", Auth, createClassRoom.create)
  .put("/alter/:id", Auth, AlterClassRoom.alter)
  .delete("/delete/:id", Auth, DeleteClassRoom.delete);

export default ClassRoomRoutes;
