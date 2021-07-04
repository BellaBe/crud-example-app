import express, { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { validateRequest } from "../middlewares";
import { body } from "express-validator";
import { Cake } from "../models/cake";
import { CakeStatus } from "../types/cake-status";


const router = express.Router();

router.post("/api/cakes", [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("comment").not().isEmpty().isLength({ min: 5, max: 200 }).withMessage("Comment is required and must be between 5 and 200 characters."),
    body("imageUrl").not().isEmpty().withMessage("Image url is required"),
    body("yumFactor").not().isEmpty().isFloat({ min: 1, max: 5 }).withMessage("Yum factor is required and must be between 1 and 5")
], validateRequest, async (req: Request, res: Response) => {
    const { name, comment, imageUrl, yumFactor } = req.body;
    const existingCake = await Cake.findOne({ name });

    if (existingCake) {
        throw new BadRequestError("Name already in use")
    }
    const cake = Cake.build({
        name,
        comment,
        imageUrl,
        yumFactor,
        status: CakeStatus.Created
    });

    await cake.save();
    res.status(201).send(cake)

});

export { router as createCakeRouter };