const nock = require("nock");
const Response = require("../lib/response");

describe("Response class", () => {
  describe("getResponse", () => {
    it("should throw an error if there is no url", () => {
      const response = new Response();
      expect(() => {
        response.getResponse();
      }).toThrow();
    });

    test("should return a status code", async () => {
      const scope = nock("http://www.google.com")
        .get("/")
        .reply(200);
      const response = new Response("http://www.google.com");
      const status = await response.getResponse();
      expect(status).toBe(200);
    });
  });

  describe("get status", () => {
    it("should return status", () => {
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
    it("should set status to UP if it's between 199 and 400", () => {
      const response = new Response();
      const spy = jest.spyOn(response, "status", "set");
      response.status = 200;
      expect(spy).toHaveBeenCalled();
      expect(response.status).toBe("UP");
      spy.mockRestore();
    });
    it("should set status to DOWN if it's greater than 399", () => {
      const response = new Response();
      const spy = jest.spyOn(response, "status", "set");
      response.status = 400;
      expect(spy).toHaveBeenCalled();
      expect(response.status).toBe("DOWN");
      spy.mockRestore();
    });
  });

  describe("get statusCode", () => {
    it("should return statusCode", () => {
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
    it("should set statusCode if there is an argument", () => {
      const response = new Response();
      const spy = jest.spyOn(response, "statusCode", "set");
      response.statusCode = 200;
      expect(spy).toHaveBeenCalled();
      expect(response.statusCode).toBe(200);
      spy.mockRestore();
    });
  });

  describe("get lastChecked", () => {
    it("should return lastChecked", () => {
      const response = new Response();
      const spy = jest.spyOn(response, "lastChecked", "get");
      const timestamp = Date.now();
      response.lastChecked = timestamp;
      const lastChecked = response.lastChecked;
      expect(spy).toHaveBeenCalled();
      expect(lastChecked).toBe(timestamp);
      spy.mockRestore();
    });
  });

  describe("set lastChecked", () => {
    it("should set lastChecked", () => {
      const response = new Response();
      const spy = jest.spyOn(response, "lastChecked", "set");
      const timestamp = Date.now();
      response.lastChecked = timestamp;
      expect(spy).toHaveBeenCalled();
      expect(response.lastChecked).toBe(timestamp);
      spy.mockRestore();
    });
  });
});
