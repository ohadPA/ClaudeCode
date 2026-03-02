const ilsFormatter = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numFormatter = new Intl.NumberFormat('he-IL');

export const formatCurrency = (amount) => ilsFormatter.format(Math.abs(amount));

export const formatNumber = (num) => numFormatter.format(num);
