import React from 'react';

const Currency = ({ amount }) => {
  // Use Intl.NumberFormat for native, accurate currency formatting
  const formattedCurrency = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return <span>{formattedCurrency}</span>;
};

export default Currency;