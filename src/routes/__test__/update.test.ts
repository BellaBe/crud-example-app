import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { CakeStatus } from "../../models/cake";

it("returns a 404 if the provided id does not exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/cakes/${id}`)
    .send({
      name: "abc",
      comment: "yummmyy",
      imageUrl: "/image.png",
      yumFactor: 4,
      status: CakeStatus.Created
    })
    .expect(404);
});


it("returns a 400 if invalid name or invalid comment or invalid imageUrl or invalid yumFacotr are provided", async () => {
  const { body: cake } = await request(app)
    .post('/api/cakes')
    .send({
      name: "abc",
      comment: "yummmyy",
      imageUrl: "/image.png",
      yumFactor: 4,
    });

  await request(app)
    .put(`/api/cakes/${cake.id}`)
    .send({
      name: "",
      comment: "yummmyy",
      imageUrl: "/image.png",
      yumFactor: 4,
    })
    .expect(400);
  await request(app)
    .put(`/api/cakes/${cake.id}`)
    .send({
      name: "updated",
      comment: "yu",
      imageUrl: "/image.png",
      yumFactor: 4,
    })
    .expect(400);
  await request(app)
    .put(`/api/cakes/${cake.id}`)
    .send({
      name: "updated",
      comment: "yummyyyy",
      imageUrl: "",
      yumFactor: 4,
    })
    .expect(400);
  await request(app)
    .put(`/api/cakes/${cake.id}`)
    .send({
      name: "updated",
      comment: "yummyyyy",
      imageUrl: "",
      yumFactor: -1,
    })
    .expect(400);
});

it("updates the cake provided valid inputs", async () => {
  const response = await request(app)
    .post('/api/cakes')
    .send({
      name: "abc",
      comment: "yummmyy",
      imageUrl: "/image.png",
      yumFactor: 4,
      status: CakeStatus.Created
    });

  await request(app)
    .put(`/api/cakes/${response.body.id}`)
    .send({
      name: "updated",
      comment: "yummmyy",
      imageUrl: "/image.png",
      yumFactor: 4,
      status: CakeStatus.Updated
    })
    .expect(200);

  const { body: updatedCake } = await request(app).get(`/api/cakes/${response.body.id}`);

  expect(updatedCake.name).toEqual('updated');
  expect(updatedCake.status).toEqual(CakeStatus.Updated);
});

