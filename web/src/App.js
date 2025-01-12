import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [ordering, setOrdering] = useState('-spent_at');
  const [filtering, setFiltering] = useState(null);

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
          <FiltersAndOrderings
            currencies={currencies}
            setOrdering={setOrdering}
            setFiltering={setFiltering}
          />
          <SpendingList
            spendings={spendings}
            setSpendings={setSpendings}
            ordering={ordering}
            filtering={filtering}
          />
      </Layout>
    </>
  );
}
