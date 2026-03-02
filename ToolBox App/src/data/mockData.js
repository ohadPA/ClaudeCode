export const buildingInfo = {
  name: 'בניין הרצל 24',
  units: 24,
  city: 'תל אביב',
  manager: 'עומר אדם',
};

export const kpiData = {
  balance: 47482,
  balanceChange: +8.3,
  monthlyIncome: 12350,
  incomeChange: +5.2,
  monthlyExpenses: 8120,
  expenseChange: -2.1,
  openRequests: 7,
  requestsChange: -12.5,
};

export const monthlyRevenue = [
  { month: "ינו׳", income: 11200, expenses: 9800 },
  { month: "פבר׳", income: 11200, expenses: 7500 },
  { month: "מרץ",  income: 11800, expenses: 8200 },
  { month: "אפר׳", income: 12000, expenses: 8800 },
  { month: "מאי",  income: 12000, expenses: 7900 },
  { month: "יוני", income: 11500, expenses: 9100 },
  { month: "יולי", income: 11800, expenses: 8700 },
  { month: "אוג׳", income: 12200, expenses: 8300 },
  { month: "ספט׳", income: 12500, expenses: 9200 },
  { month: "אוק׳", income: 12100, expenses: 8600 },
  { month: "נוב׳", income: 12350, expenses: 8100 },
  { month: "דצמ׳", income: 12350, expenses: 8120 },
];

export const expenseCategories = [
  { name: 'ניקיון',  value: 2800, color: '#2563EB' },
  { name: 'תחזוקה', value: 1900, color: '#059669' },
  { name: 'חשמל',   value: 1200, color: '#D97706' },
  { name: 'מים',    value: 800,  color: '#06B6D4' },
  { name: 'ביטוח',  value: 600,  color: '#7C3AED' },
  { name: 'גינון',  value: 500,  color: '#EC4899' },
  { name: 'שונות',  value: 320,  color: '#94A3B8' },
];

export const recentActivity = [
  { id: 1,  date: '01/03/2026', type: 'הכנסה', desc: 'ועד בית – דירה 4',           amount:  350,  status: 'הושלם'  },
  { id: 2,  date: '28/02/2026', type: 'הוצאה', desc: 'תיקון מעלית',                amount: -780,  status: 'הושלם'  },
  { id: 3,  date: '27/02/2026', type: 'הכנסה', desc: 'ועד בית – דירה 7',           amount:  350,  status: 'הושלם'  },
  { id: 4,  date: '26/02/2026', type: 'הוצאה', desc: 'שירות ניקיון – פברואר',       amount: -1200, status: 'הושלם'  },
  { id: 5,  date: '25/02/2026', type: 'הכנסה', desc: 'ועד בית – דירה 2',           amount:  350,  status: 'הושלם'  },
  { id: 6,  date: '24/02/2026', type: 'הוצאה', desc: 'חשמל – חלל משותף',           amount: -420,  status: 'בטיפול' },
  { id: 7,  date: '23/02/2026', type: 'פניה',  desc: 'תיקון דלת כניסה',            amount:  null, status: 'ממתין'  },
  { id: 8,  date: '22/02/2026', type: 'הוצאה', desc: 'גינון – פברואר',             amount: -300,  status: 'הושלם'  },
  { id: 9,  date: '21/02/2026', type: 'הכנסה', desc: 'ועד בית – דירה 12',          amount:  350,  status: 'הושלם'  },
  { id: 10, date: '20/02/2026', type: 'פניה',  desc: 'בקשת כניסת רכב – דייר חדש', amount:  null, status: 'בטיפול' },
];

export const technicians = [
  { id: 1, name: 'יוסי כהן',    profession: 'מסגר',    rating: 4.8, reviews: 124, available: true,  avatar: 'יכ', color: '#2563EB' },
  { id: 2, name: 'מיכל לוי',    profession: 'חשמלאי',  rating: 4.9, reviews: 89,  available: true,  avatar: 'מל', color: '#059669' },
  { id: 3, name: "ג'קוס פריד",  profession: 'מעליות',  rating: 4.5, reviews: 67,  available: false, avatar: 'גפ', color: '#D97706' },
  { id: 4, name: 'אמיר דוד',    profession: 'צנרת',    rating: 4.7, reviews: 103, available: true,  avatar: 'אד', color: '#7C3AED' },
];
