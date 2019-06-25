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

describe("get status", () => {
  test("should return status", () => {
    const response = new Response();
    const spy = jest.spyOn(response, "status", "get");
    response.status = 200;
    const status = response.status;
    expect(spy).toHaveBeenCalled();
    expect(status).toBe("UP");
    spy.mockRestore();
  });
});

describe("set status", () => {
  test("should set status to UP if it's between 199 and 400", () => {
    const response = new Response();
    const spy = jest.spyOn(response, "status", "set");
    response.status = 200;
    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe("UP");
    spy.mockRestore();
  });
  test("should set status to DOWN if it's greater than 399", () => {
    const response = new Response();
    const spy = jest.spyOn(response, "status", "set");
    response.status = 400;
    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe("DOWN");
    spy.mockRestore();
  });
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
