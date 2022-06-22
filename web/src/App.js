import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);

  const addSpending = (newSpending) => {
    setSpendings([...spendings, newSpending])
  }

  const currencies = ['HUF', 'USD']

  return (
    <>
      <Layout>
          <Form 
            addSpending={addSpending}
            currencies={currencies}
          />
          <FiltersAndOrderings currencies={currencies}/>
          <SpendingList
            spendings={spendings}
            setSpendings={setSpendings}
          />
      </Layout>
    </>
  );
}
