// db.js — localStorage-based persistence layer
// Acts as a simple "table" store for the ToolBox App

const KEYS = {
  budget: 'toolbox_budget_v1',
  income: 'toolbox_income_v1',
};

export function getBudget() {
  try {
    const raw = localStorage.getItem(KEYS.budget);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBudget(budget) {
  localStorage.setItem(KEYS.budget, JSON.stringify({ ...budget, updatedAt: Date.now() }));
}

export function clearBudget() {
  localStorage.removeItem(KEYS.budget);
}

export function getIncome() {
  try {
    const raw = localStorage.getItem(KEYS.income);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveIncome(rows) {
  localStorage.setItem(KEYS.income, JSON.stringify(rows));
}
