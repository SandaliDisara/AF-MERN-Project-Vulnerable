const request = require("supertest");
const express = require("express");
const router = require("../Routes/AgriBlog-route"); // Adjust path to router file
const errorHandler = require("../middlewares/errorHandler"); // Adjust path as necessary

// Create an instance of the app for testing
const app = express();
app.use(express.json());
app.use("/api", router);

// Ensure the errorHandler is attached after the routes
app.use(errorHandler);

describe("Image Routes Error Handling", () => {
  it("should handle errors using next(error) when file is missing", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(); // Mock console.error
  
    const res = await request(app)
      .post("/api/upload")
      .field("title", "Test Image")
      .field("articlebody", "Test article body"); // No file attached
  
    expect(res.statusCode).toEqual(400); // Expect 400 for bad request
    expect(res.body).toHaveProperty("message", "Title, article body, and image file are required."); // Check for the correct message
  
    expect(consoleSpy).toHaveBeenCalled(); // Ensure that the error was logged
    consoleSpy.mockRestore(); // Restore the original console.error
  });
  
});
