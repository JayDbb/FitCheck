// Testing for the /user path 


// Mock the database model to prevent real DB writes
jest.mock("../api/user/model", () => ({
    create: jest.fn()
  }
));

const request = require("supertest");
const app = require("../index");
const User = require("../api/user/model");
let server;



jest.setTimeout(10000);  // Set global timeout to 10 seconds

// Setup and teardown
beforeAll((done) => {
    server = app.listen(0, ()=>{
      console.log("Server Starting")
      done()
    }); // Start the server
});
  
afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});


describe("POST /user/create", () => {
  it("should create a new user and return it", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com", password: "hashedpassword" };

    User.create.mockResolvedValue(mockUser);

    const res = await request(server)
      .post("/user/create")
      .send({ name: "John Doe", email: "john@example.com", password: "securepassword" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "John Doe");
    expect(res.body).toHaveProperty("email", "john@example.com");
  });

  it("should return a 400 error if required fields are missing", async () => {
    const res = await request(server)
      .post("/user/create")
      .send({ email: "john@example.com" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Name, email, and password are required");
  });
});

