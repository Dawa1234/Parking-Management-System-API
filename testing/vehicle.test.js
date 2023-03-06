const supertest = require("supertest");
const app = require("../script");

const api = supertest(app);
// User Model
const vehicleModel = require("../Model/vehicleCategory-model");
// To execute function. [find() , findOne() , deleteMany()]
const mongoose = require("mongoose");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlN2RlOGRmZDQzMjU3NjZkNDhjZDkiLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkV3plVXlsd3FGajlTL1pmVXpmendqT2lsbEFwczJOZWZxTXBXbFJxZ3YvcFJuUFBxUUM3dC4iLCJmb3JnZXRQYXNzd29yZCI6IjExMTkyODM5IiwicHJvZmlsZUltYWdlIjoiSW1hZ2VzL2ltYWdlLTE2Nzc3NjA5ODI5MjcuanBnIiwiZnVsbG5hbWUiOiJqb2huIiwiY29udGFjdCI6Ijk4MjkyODM5MjgiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODExNjY3NCwiZXhwIjoxNjc4MjAzMDc0fQ._08xj44tcvhuu0qzlHXEDBNDstlSBwrrGZNTAEhgJAU";

const newVehicle = {
  vehicleCategory: "Truck",
};
// Just clear all data from the database connection.
// Before running the test.
beforeAll(async () => {
  await vehicleModel.deleteMany({});
});

test("get all vehicle", async () => {
  await api.get("/vehicle").set("Authorization", `bearer ${token}`).expect(201);
});
test("add new vehicle", async () => {
  await api
    .post("/vehicle")
    .set("Authorization", `bearer ${token}`)
    .send(newVehicle)
    .expect(201);
});

test("get vehicle by category", async () => {
  const category = "Car";
  await api
    .get(`/vehicle/${category}`)
    .set("Authorization", `bearer ${token}`)
    .expect(200);
});

// close the connection after all the test is completed
// teardown
afterAll(async () => {
  await mongoose.connection.close();
});
