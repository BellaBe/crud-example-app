import express, { Request, Response } from "express";
import { Cake } from "../models/cake";
import { body } from "express-validator";
import { validateRequest } from "../middlewares";
import { NotFoundError } from "../errors";
import { CakeStatus } from "../models/types/cake-status";


const router = express.Router();

router.put("/api/cakes/:id", [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("comment").not().isEmpty().isLength({ min: 5, max: 200 }).withMessage("Comment is required and must be between 5 and 200 characters."),
    body("imageUrl").not().isEmpty().withMessage("Image url is required"),
    body("yumFactor").not().isEmpty().isFloat({ min: 1, max: 5 }).withMessage("Yum factor is required and must be between 1 and 5")
], validateRequest, async (req: Request, res: Response) => {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
        throw new NotFoundError();
    }

    cake.set({
        name: req.body.name,
        comment: req.body.comment,
        imageUrl: req.body.imageUrl,
        yumFactor: req.body.yumFactor,
        status: CakeStatus.Updated
    });

    await cake.save();

    res.send(cake);
});

export { router as updateCakeRouter }