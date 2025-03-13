import { Router } from "express";
import { getOrders } from "../controllers/OrderController";

const router = Router();

router.get("/", getOrders);

export default router;