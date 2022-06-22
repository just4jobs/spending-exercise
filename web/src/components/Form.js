import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import FormErrorMessages from './FormErrorMessages';

const DEFAULT_DESCRIPTION = '';
const DEFAULT_AMOUNT = 0;
const DEFAULT_CURRENCY = 'USD';

const DEFAULT_STATE = {
  description: DEFAULT_DESCRIPTION,
  amount: DEFAULT_AMOUNT,
  currency: DEFAULT_CURRENCY,
}

export default function Form(props) {
  const [state, setState] = useState(DEFAULT_STATE);
  const [errorMessages, setErrorMessages] = useState(null);

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
        if (res.status === 200) {
          props.addSpending(body);
          setErrorMessages(null)
        }
        else if (res.status === 400) {
          setErrorMessages(body);
        }
        return {
          status: res.status,
          body,
        };
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
        {errorMessages && <FormErrorMessages errors={errorMessages}/>}
      </FormStyles>
    </>
  );
}
