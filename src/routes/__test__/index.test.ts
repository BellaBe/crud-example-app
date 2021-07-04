import request from "supertest";
import { app } from "../../app";


it("can fetch a list of cakes", async () => {
    await request(app).post("/api/cakes").send({ name: "Mimosa", comment: "Such a yummy cake", imageUrl: "/mimosa.png", yumFactor: 5 })
        .expect(201);
    await request(app).post("/api/cakes").send({ name: "Cocholate", comment: "Such a yummy cake", imageUrl: "/chocolate.png", yumFactor: 5 })
        .expect(201);
    await request(app).post("/api/cakes").send({ name: "Carrot", comment: "Such a yummy cake", imageUrl: "/carrot.png", yumFactor: 5 })
        .expect(201);

    const response = await request(app).get("/api/cakes").send().expect(200);

    expect(response.body.length).toEqual(3);

});