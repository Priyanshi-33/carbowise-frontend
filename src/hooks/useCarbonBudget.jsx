// src/hooks/useCarbonBudget.jsx
import { useState } from "react";

export function useCarbonBudget(initialBudget = 100) {
  const [budget, setBudget] = useState(initialBudget);
  const [used, setUsed] = useState(0);

  const addEmission = (amount) => {
    setUsed((prev) => prev + amount);
  };

  const resetBudget = (newBudget = initialBudget) => {
    setBudget(newBudget);
    setUsed(0);
  };

  const remaining = budget - used;
  const percentageUsed = (used / budget) * 100;

  let status = "safe";
  if (percentageUsed > 80 && percentageUsed < 100) status = "warning";
  if (percentageUsed >= 100) status = "exceeded";

  return { budget, used, remaining, percentageUsed, status, addEmission, resetBudget };
}



