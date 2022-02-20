import express from "express";
import initRoutes from "../src/routes";
import helmet from "helmet";
import request from "supertest";

const app = express();

app.use(express.json());
app.use(helmet());
initRoutes(app);

describe("POST /commission", () => {
  it("should fail if date is not a string", async () => {
    const payload = {
      date: 2022,
      amount: "200.40",
      currency: "USD",
      client_id: 21,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(422);
  });

  it("should fail if date is not 10 characters long", async () => {
    const payload = {
      date: "2022-12-123",
      amount: "200.40",
      currency: "USD",
      client_id: 21,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(422);
  });

  it("should fail if date is in the future", async () => {
    const payload = {
      date: "2050-01-13",
      amount: "200.40",
      currency: "USD",
      client_id: 21,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(500);
  });

  it("should work using EUR", async () => {
    const payload = {
      date: "2021-01-13",
      amount: "1000",
      currency: "EUR",
      client_id: 21,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      amount: "5.00",
      currency: "EUR",
    });
  });

  it("should work using EUR and round the commission to 2 decimals", async () => {
    const payload = {
      date: "2021-01-13",
      amount: "499",
      currency: "EUR",
      client_id: 1,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      amount: "2.50",
      currency: "EUR",
    });
  });

  it("should work using USD", async () => {
    const payload = {
      date: "2021-01-13",
      amount: "1000",
      currency: "USD",
      client_id: 22,
    };
    const res = await request(app).post("/commission").send(payload);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      amount: "4.11",
      currency: "EUR",
    });
  });
});
