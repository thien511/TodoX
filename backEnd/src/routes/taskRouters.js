import express from "express";
import { createTasks, getAllTasks, updateAllTask, deleteTask } from "../controllers/taskControllers.js";

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', createTasks);

router.put('/:id', updateAllTask);

router.delete('/:id', deleteTask);

export default router;