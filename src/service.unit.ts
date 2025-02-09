import assert from "assert";
import { MyService } from "./service";

describe("My Service", function () {
  let myService = new MyService();
  describe("add()", function () {
    it("add two numbers together", function () {
      assert.equal(myService.add(2, 3), 5);
    });

    it("add three numbers together", function () {
      assert.equal(myService.add(2, 3, 5), 10);
    });
  });

  describe("minus()", function () {
    it("deduct two numbers in sequence", function () {
      assert.equal(myService.minus(7, 5), 2);
    });

    it("deduct three numbers in sequence", function () {
      assert.equal(myService.minus(47, 7, 25), 15);
    });
  });
});
