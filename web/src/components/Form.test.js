import React from 'react';
import Form from './Form';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
  container = null;
});

it('save calls API to add new spending', async () => {

  // Given

  jest.spyOn(global, "fetch").mockImplementation(
    () => Promise.resolve(
      {
        json: () => Promise.resolve({})
      }
    )
  );

  await act(async () => render(<Form />));

  // When

  const description = screen.getByTestId('add_spending_description');
  fireEvent.change(description, { target: { value: 'Mango' } });

  const amount = screen.getByTestId('add_spending_amount');
  fireEvent.input(amount, { target: { value: 1200 } });

  const currency = screen.getByTestId('add_spending_currency');
  fireEvent.change(currency, 'USD');

  const submit = screen.getByTestId('add_spending_submit');
  fireEvent.click(submit);

  // Then

  expect(global.fetch).toBeCalledWith(`http://localhost:5000/spendings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      {
        description: 'Mango',
        amount: "1200",
        currency: 'USD'
      }
    )
  });

  global.fetch.mockRestore();

});