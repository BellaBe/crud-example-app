import request from "supertest";
import { app } from "../../app";
import { Cake, CakeStatus } from "../../models/cake";


it("has a route handler listening to /api/cakes for post requests", async () => {
    const response = await request(app).post("/api/cakes").send({});
    expect(response.statusCode).not.toEqual(404);
});

it("returns an error if name already exists", async () => {
    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yummmyy",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(201);

    const cakes = await Cake.find({});
    expect(cakes[0].name).toEqual("abc");

    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yummmyy",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(400);
});

it("returns an error if invalid comment or yumFactor are provided", async () => {
    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yum",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(400);

    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yum",
        imageUrl: "/image.png",
        yumFactor: -1,
        status: CakeStatus.Created
    }).expect(400);
});

it("returns an error if one of the inputs is not provided", async () => {
    // image is not provided
    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yum",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(400);

    // name is not provided
    await request(app).post("/api/cakes").send({
        comment: "yummmm",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(400);

    // yumFacotr is not provided
    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yum",
        imageUrl: "/image.png",
        status: CakeStatus.Created
    }).expect(400);

});


it("creates a cake with valid inputs", async () => {
    let cakes = await Cake.find({});
    expect(cakes.length).toEqual(0);
    await request(app).post("/api/cakes").send({
        name: "abc",
        comment: "yummmyy",
        imageUrl: "/image.png",
        yumFactor: 4,
        status: CakeStatus.Created
    }).expect(201);

    cakes = await Cake.find({});
    expect(cakes.length).toEqual(1);
    expect(cakes[0].name).toEqual("abc");
    expect(cakes[0].comment).toEqual("yummmyy");
    expect(cakes[0].imageUrl).toEqual("/image.png");
    expect(cakes[0].yumFactor).toEqual(4);
    expect(cakes[0].status).toEqual(CakeStatus.Created);
});



