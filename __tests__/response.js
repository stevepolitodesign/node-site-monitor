const Response = require("../lib/response");

describe("getResponse", () => {
  test("should throw an error if there is no url", () => {
    const response = new Response();
    expect(() => {
      response.getResponse();
    }).toThrow();
  });

  test.todo("should return a status code");
});

describe("get statusCode", () => {
  test("should return statusCode", () => {
    const response = new Response();
    const spy = jest.spyOn(response, "statusCode", "get");
    response.statusCode = 200;
    const statusCode = response.statusCode;
    expect(spy).toHaveBeenCalled();
    expect(statusCode).toBe(200);
    spy.mockRestore();
  });
});

describe("set statusCode", () => {
  test("should set statusCode if there is an argument", () => {
    const response = new Response();
    const spy = jest.spyOn(response, "statusCode", "set");
    response.statusCode = 200;
    expect(spy).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
    spy.mockRestore();
  });
});
