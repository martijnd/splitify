export function getBalance(
  expenses: {
    id: number;
    amount: number;
    contributions: { id: number; contribution: number }[];
  }[]
) {
  const balances: { [key: number]: number } = {};

  expenses.forEach(({ id, amount, contributions }) => {
    if (!balances[id]) balances[id] = 0;
    balances[id] += amount;

    contributions.forEach(({ id: participantId, contribution }) => {
      if (!balances[participantId]) balances[participantId] = 0;
      balances[participantId] -= amount * (contribution / amount);
    });
  });

  return Object.entries(balances).map(([id, balance]) => ({
    id: Number(id),
    balance,
  }));
}

export function calculate(
  list: { id: number; balance: number }[]
): { from: number; to: number; amount: number }[] {
  const result: { from: number; to: number; amount: number }[] = [];
  let from = list.find((item) => item.balance < 0);
  let to = list.find((item) => item.balance > 0);
  while (from && to) {
    const amount = Math.min(-from.balance, to.balance);
    from.balance += amount;
    to.balance -= amount;
    result.push({ from: from.id, to: to.id, amount });
    from = list.find((item) => item.balance < 0);
    to = list.find((item) => item.balance > 0);
  }
  return result;
}
