export const defaultInputs = {
  leads: 150,
  value: 500,
  conversion: 20,
  missed: 25,
  recovery: 50,
  hours: 15,
  saving: 60,
};
export const limits = {
  leads: [20, 500],
  value: [50, 5000],
  conversion: [1, 40],
  missed: [0, 50],
  recovery: [0, 100],
  hours: [0, 40],
  saving: [0, 100],
};
export function calculateROI(input) {
  const a = Object.fromEntries(
    Object.entries(limits).map(([k, [min, max]]) => [
      k,
      Math.min(
        max,
        Math.max(
          min,
          Number.isFinite(Number(input[k])) ? Number(input[k]) : min,
        ),
      ),
    ]),
  );
  const monthly =
    ((((((a.leads * a.missed) / 100) * a.recovery) / 100) * a.conversion) /
      100) *
    a.value;
  const weeklyHours = (a.hours * a.saving) / 100;
  return {
    monthly,
    annual: monthly * 12,
    weeklyHours,
    annualHours: weeklyHours * 52,
  };
}
