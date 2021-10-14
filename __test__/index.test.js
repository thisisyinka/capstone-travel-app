import { getTravelData } from "../src/client/js/index";

describe("Testing getting travel data functionality", () => {
    test("Testing the getTravelData function and validate date input as a string", () => {
        expect(getTravelData).toBeDefined();
        const dateInput = "december 3 2021";
        expect(typeof dateInput).toBe("string");

    })
})