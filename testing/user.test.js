const supertest = require("supertest");
const app = require("../script");

const api = supertest(app);
// User Model
const User = require("../Model/user-model");
// To execute function. [find() , findOne() , deleteMany()]
const mongoose = require("mongoose");

const user = {
  username: "testuser",
  fullname: "testuser",
  email: "testuser",
  contact: "testuser",
  password: "123123123",
  forgetPassword: "123123123",
};
const loginUser = {
  username: "user1",
  password: "123123123",
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlN2RlOGRmZDQzMjU3NjZkNDhjZDkiLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkV3plVXlsd3FGajlTL1pmVXpmendqT2lsbEFwczJOZWZxTXBXbFJxZ3YvcFJuUFBxUUM3dC4iLCJmb3JnZXRQYXNzd29yZCI6IjExMTkyODM5IiwicHJvZmlsZUltYWdlIjoiSW1hZ2VzL2ltYWdlLTE2Nzc3NjA5ODI5MjcuanBnIiwiZnVsbG5hbWUiOiJqb2huIiwiY29udGFjdCI6Ijk4MjkyODM5MjgiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODExNjY3NCwiZXhwIjoxNjc4MjAzMDc0fQ._08xj44tcvhuu0qzlHXEDBNDstlSBwrrGZNTAEhgJAU";
// Just clear all data from the database connection.
// Before running the test.
beforeAll(async () => {
  await User.deleteMany({});
});

test("get all user testing", async () => {
  await api.get("/user/").set("Authorization", `bearer ${token}`).expect(203);
});
test("register user testing", async () => {
  await api.post("/user/register").send(user).expect(201);
});

test("Testing login for user", async () => {
  await api
    .post("/user/login")
    .send(loginUser)
    .expect(203)
    .expect((res) => {
      expect(res.body.role).toContain("Admin");
    });
});
test("Testing deleting user", async () => {
  await api
    .delete("/user/deleteAll")
    .set("Authorization", `bearer ${token}`)
    .expect(203);
});
test("get all the booked slots ", async () => {
  const userId = "63ee7de8dfd4325766d48cd9";
  await api
    .get(`/user/bookedSlot/${userId}`)
    .set("Authorization", `bearer ${token}`)
    .expect(200);
});
test("get all the booked slots of user by bike", async () => {
  await api
    .get("/user/bike")
    .set("Authorization", `bearer ${token}`)
    .expect(200);
});
test("get all the booked slots of user by car", async () => {
  await api
    .get("/user/car")
    .set("Authorization", `bearer ${token}`)
    .expect(200);
});
test("delete all transaction", async () => {
  await api
    .get("/user/transaction")
    .set("Authorization", `bearer ${token}`)
    .expect(201);
});

// close the connection after all the test is completed
// teardown
afterAll(async () => {
  await mongoose.connection.close();
});
