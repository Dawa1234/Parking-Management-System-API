const supertest = require("supertest");
const app = require("../script");

const api = supertest(app);
// User Model
const parkingSlotModel = require("../Model/parkingSlot-model");
// To execute function. [find() , findOne() , deleteMany()]
const mongoose = require("mongoose");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlN2RlOGRmZDQzMjU3NjZkNDhjZDkiLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkV3plVXlsd3FGajlTL1pmVXpmendqT2lsbEFwczJOZWZxTXBXbFJxZ3YvcFJuUFBxUUM3dC4iLCJmb3JnZXRQYXNzd29yZCI6IjExMTkyODM5IiwicHJvZmlsZUltYWdlIjoiSW1hZ2VzL2ltYWdlLTE2Nzc3NjA5ODI5MjcuanBnIiwiZnVsbG5hbWUiOiJqb2huIiwiY29udGFjdCI6Ijk4MjkyODM5MjgiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODExNjY3NCwiZXhwIjoxNjc4MjAzMDc0fQ._08xj44tcvhuu0qzlHXEDBNDstlSBwrrGZNTAEhgJAU";
const newSlot = {
  slot: "R-1C1",
  booked: false,
  occupied: false,
  row: "R-1",
  column: "R-1",
  vehicleCategory: "Car",
  floorId: "6d7a81a202dy098a7h6ad906b",
};

// Just clear all data from the database connection.
// Before running the test.
beforeAll(async () => {
  await parkingSlotModel.deleteMany({});
});

test("get all parkingSlot", async () => {
  await api
    .get("/parkingSlot")
    .set("Authorization", `bearer ${token}`)
    .expect(201);
});
test("add new parkingSlot", async () => {
  await api
    .post("/parkingSlot")
    .set("Authorization", `bearer ${token}`)
    .send(newSlot)
    .expect(200);
});
test("get parkingSlot by id", async () => {
  const slotId = "63f08543c2827e1f135d8520";
  await api
    .get(`/parkingSlot/${slotId}`)
    .set("Authorization", `bearer ${token}`)
    .expect(201);
});

test("cancel parkingSlot booked by user", async () => {
  const slotId = "63f08543c2827e1f135d8520";
  await api
    .put(`/parkingSlot/${slotId}`)
    .set("Authorization", `bearer ${token}`)
    .expect(201);
});
test("delete parkingSlot", async () => {
  await api
    .delete("/parkingSlot")
    .set("Authorization", `bearer ${token}`)
    .expect(200);
});

// close the connection after all the test is completed
// teardown
afterAll(async () => {
  await mongoose.connection.close();
});
