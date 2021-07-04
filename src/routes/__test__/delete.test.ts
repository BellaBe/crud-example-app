import request from "supertest";
import { app } from "../../app";
import { Cake, CakeStatus } from "../../models/cake";

it("marks a cake as cancelled", async () => {
    const { body: cake } = await request(app).post("/api/cakes").send({
        name: "Mimosa",
        comment: "Such a yummy cake",
        imageUrl: "/mimosa.png",
        yumFactor: 5,
    }).expect(201);

    await request(app).delete(`/api/cakes/${cake.id}`).expect(204);

    const cancelledCake = await Cake.findById(cake.id);
    expect(cancelledCake!.status).toEqual(CakeStatus.Cancelled)
});
