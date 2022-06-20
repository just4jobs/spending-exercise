import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';

export default function Form(props) {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    return fetch(`http://localhost:5000/spendings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          props.addSpending(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        event.preventDefault();
      });
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
          data-testid='add_spending_description'
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
          data-testid='add_spending_amount'
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
          data-testid='add_spending_currency'
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles 
          type='submit'
          data-testid='add_spending_submit'
          value='Save'
        />
      </FormStyles>
    </>
  );
}
