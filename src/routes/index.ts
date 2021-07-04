import express, { Request, Response } from "express";
import { Cake } from "../models/cake";


const router = express.Router();

router.get("/api/cakes", async (req: Request, res: Response) => {
    const cakes = await Cake.find({});
    res.send(cakes);
});

export { router as indexCakeRouter };