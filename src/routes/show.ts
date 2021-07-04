import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { NotFoundError, BadRequestError } from "../errors";
import { Cake } from "../models/cake";
const router = express.Router();

router.get("/api/cakes/:id", async (req: Request, res: Response) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError("A valid cake id must be provided")
    }

    const cake = await Cake.findById(req.params.id);

    if (!cake) {
        throw new NotFoundError();
    }

    res.send(cake);
});

export { router as showCakeRouter };