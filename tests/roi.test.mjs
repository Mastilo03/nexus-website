import test from "node:test";
import assert from "node:assert/strict";
import { calculateROI, defaultInputs } from "../src/roi.mjs";
test("baseline matches the brief’s revenue and hours formulas", () => {
  assert.deepEqual(calculateROI(defaultInputs), {
    monthly: 1875,
    annual: 22500,
    weeklyHours: 9,
    annualHours: 468,
  });
});
test("zero missed leads or zero recovery creates no revenue opportunity", () => {
  assert.equal(calculateROI({ ...defaultInputs, missed: 0 }).monthly, 0);
  assert.equal(calculateROI({ ...defaultInputs, recovery: 0 }).annual, 0);
});
test("time savings remain independent of revenue assumptions", () => {
  assert.equal(
    calculateROI({ ...defaultInputs, hours: 40, saving: 100, missed: 0 })
      .annualHours,
    2080,
  );
  assert.equal(calculateROI({ ...defaultInputs, saving: 0 }).weeklyHours, 0);
});
test("upper bounds produce the expected maximum without treating percentages as whole numbers", () => {
  assert.deepEqual(
    calculateROI({
      leads: 500,
      value: 5000,
      conversion: 40,
      missed: 50,
      recovery: 100,
      hours: 40,
      saving: 100,
    }),
    { monthly: 500000, annual: 6000000, weeklyHours: 40, annualHours: 2080 },
  );
});
test("invalid and out-of-range values cannot produce NaN or negative estimates", () => {
  const r = calculateROI({
    ...defaultInputs,
    leads: Infinity,
    recovery: -10,
    hours: 100,
  });
  assert.equal(r.monthly, 0);
  assert.equal(r.weeklyHours, 24);
  assert.ok(Object.values(r).every(Number.isFinite));
});
