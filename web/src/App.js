import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [ordering, setOrdering] = useState('-spent_at');

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
          <FiltersAndOrderings currencies={currencies} setOrdering={setOrdering}/>
          <SpendingList
            spendings={spendings}
            setSpendings={setSpendings}
            ordering={ordering}
          />
      </Layout>
    </>
  );
}
