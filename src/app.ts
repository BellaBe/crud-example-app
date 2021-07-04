import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";

import { createCakeRouter } from "./routes/new";
import { showCakeRouter } from "./routes/show";
import { indexCakeRouter } from "./routes";
import { updateCakeRouter } from "./routes/update";
import { deleteCakeRouter } from "./routes/delete";

const app = express();

app.use(json());
app.use(cors());


app.use(createCakeRouter);
app.use(showCakeRouter);
app.use(indexCakeRouter);
app.use(updateCakeRouter);
app.use(deleteCakeRouter);

app.all("*", async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export { app };