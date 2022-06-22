import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

const DEFAULT_NULL_FILTER = 'ALL'

export default function CurrencyFilter({currencies, setOrdering, setFiltering}) {

  const handleOrderingChange = changeEvent => {
    const newOrdering = changeEvent.target.value;
    setOrdering(newOrdering);
  }

  const handleCurrencyFilterChange = clickEvent => {
    const newFiltering = clickEvent.target.name;
    setFiltering(newFiltering === DEFAULT_NULL_FILTER ? null : newFiltering);
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings onChange={handleOrderingChange}>
          <select>
            <option value='-spent_at'>Sort by Date descending (default)</option>
            <option value='spent_at'>Sort by Date ascending</option>
            <option value='-amount'>Sort by Amount descending</option>
            <option value='amount'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          {[DEFAULT_NULL_FILTER, ...currencies].map(currency => <li key={currency} onClick={handleCurrencyFilterChange}>
            <CurrencyButton
              name={currency}
            >
              {currency}
            </CurrencyButton>
          </li>)}
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
