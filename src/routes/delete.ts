import express, { Request, Response } from "express";
import { Cake } from "../models/cake";
import { NotFoundError } from "../errors";
import { CakeStatus } from "../models/types/cake-status";


const router = express.Router();

router.delete("/api/cakes/:cakeId", async (req: Request, res: Response) => {
    const { cakeId } = req.params;
    const cake = await Cake.findById(cakeId);

    if (!cake) {
        throw new NotFoundError();
    }

    cake.status = CakeStatus.Cancelled;

    await cake.save();

    res.status(204).send(cake);
});

export { router as deleteCakeRouter };