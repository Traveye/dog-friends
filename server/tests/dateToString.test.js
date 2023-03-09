const dateToString = require('../utils/date');

descibe("dateToString", () => {
    it ("should return a string", () => {
        const result = dateToString(1646947126241);
        expect(result).toBe("3/9/2023 at 18:52");
    })
});