import { calculate, getBalance } from "./expense-calculator";

describe("Expense Calculator", () => {
  it("should calculate the total amount of expenses", () => {
    const expenses = [
      {
        id: 1,
        amount: 100,
        contributions: [
          { id: 1, contribution: 50 },
          { id: 3, contribution: 50 },
        ],
      },
      {
        id: 2,
        amount: 200,
        contributions: [
          { id: 1, contribution: 100 },
          { id: 2, contribution: 100 },
        ],
      },
      {
        id: 3,
        amount: 300,
        contributions: [
          { id: 2, contribution: 150 },
          { id: 3, contribution: 150 },
        ],
      },
    ];
    const result = getBalance(expenses);
    expect(result).toStrictEqual([
      { id: 1, balance: -50 },
      { id: 2, balance: -50 },
      { id: 3, balance: 100 },
    ]);
  });

  it("should calculate the amount to be paid by each participant", () => {
    const list = [
      { id: 1, balance: -50 },
      { id: 2, balance: -50 },
      { id: 3, balance: 100 },
    ];
    const result = calculate(list);
    expect(result).toStrictEqual([
      { from: 1, to: 3, amount: 50 },
      { from: 2, to: 3, amount: 50 },
    ]);
  });
});
