import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { CakeStatus } from "../../models/cake";

it("returns a 404 if the cake is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/cakes/${id}`)
        .send()
        .expect(404);

});

it("returns a 400 if invalid id is provided", async () => {
    const id = 123;
    await request(app)
        .get(`/api/cakes/${id}`)
        .send()
        .expect(400);

});
it("returns the cake if the cake is found", async () => {

    const cake = {
        name: "abc",
        comment: "yummmyy",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }

    const { body: createdCake } = await request(app).post("/api/cakes").send(cake).expect(201);

    const { body: featchedCake } = await request(app).get(`/api/cakes/${createdCake.id}`).send().expect(200);

    expect(featchedCake.name).toEqual(cake.name);
    expect(featchedCake.comment).toEqual(cake.comment);
    expect(featchedCake.yumFactor).toEqual(cake.yumFactor);
    expect(featchedCake.imageUrl).toEqual(cake.imageUrl);
});