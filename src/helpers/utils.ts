export const LIMITS = [10, 25, 50, 100, 250, 500, 1000, 2000];

export const limitsWithId = LIMITS.map((limit, index) => ({
  id: index + 1,
  value: limit,
}));

export const customSort = (
  a: Record<string, any>,
  b: Record<string, any>,
  sortedColumn: string | undefined,
): number => {
  if (sortedColumn === undefined) {
    return 0;
  }

  const valueA = a[sortedColumn];
  const valueB = b[sortedColumn];

  if (typeof valueA === 'string' && typeof valueB === 'string') {
    return valueA.localeCompare(valueB);
  }

  return Number(valueA) - Number(valueB);
};