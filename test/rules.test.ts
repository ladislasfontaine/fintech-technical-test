import turnover from "./../src/services/rules";

describe("Commission Rules", () => {
  describe("defaultPricing", () => {
    it("should return 0.5% of the amount sent", () => {
      const result = turnover.defaultPricing({ euroAmount: 1000 });
      expect(result).toEqual(5);
    });

    it("should return minimum 0.05 (here with an amount of 10)", () => {
      const result = turnover.defaultPricing({ euroAmount: 10 });
      expect(result).toEqual(0.05);
    });

    it("should return minimum 0.05 (here with an amount of 1)", () => {
      const result = turnover.defaultPricing({ euroAmount: 1 });
      expect(result).toEqual(0.05);
    });
  });

  describe("clientWithDiscount", () => {
    it("should return 0.05 if client has id 42", () => {
      const result = turnover.clientWithDiscount({ clientId: 42 });
      expect(result).toEqual(0.05);
    });

    it("should return undefined if client id is not 42", () => {
      const result = turnover.clientWithDiscount({ clientId: 123 });
      expect(result).toEqual(undefined);
    });
  });
});
