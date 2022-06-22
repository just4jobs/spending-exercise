import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter(props) {

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select>
            <option value='-spent_at'>Sort by Date descending (default)</option>
            <option value='spent_at'>Sort by Date ascending</option>
            <option value='-amount'>Sort by Amount descending</option>
            <option value='amount'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
            >
              ALL
            </CurrencyButton>
          </li>
          {props.currencies.map(currency => <li key={currency}>
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
