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

  return (
    <>
      <Layout>
          <Form addSpending={addSpending}/>
          <FiltersAndOrderings />
          <SpendingList
            spendings={spendings}
            setSpendings={setSpendings}
          />
      </Layout>
    </>
  );
}
