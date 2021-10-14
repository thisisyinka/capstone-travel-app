import { tripCountdown } from "../src/client/js/tripCountdown";

describe("check now is a number", () => {
    test('now should be converted to milliseconds', () => {
        expect(tripCountdown).toBeDefined();
        const now = Date.parse(new Date());
        expect(typeof now).toBe("number");
    })
});