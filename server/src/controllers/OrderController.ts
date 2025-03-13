import { Request, Response } from "express";
import Order from "../models/Order";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();

        if(!orders){
            console.log("There are no orders to fetch!");
            return;
        }

        res.status(200).json({
            message: "Orders fetched successfully",
            orders: orders
        });
    }
    catch(error){
        console.error("Error fetching orders: ", error);
        res.status(500).json({ message: "Error fetching orders", error});
    }
}