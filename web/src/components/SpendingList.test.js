import React from 'react';
import { render } from '@testing-library/react';
import SpendingList from './SpendingList';
import { act } from 'react-dom/test-utils';

const spendings = [{
    description: "US mango",
    amount: 3,
    currency: "USD",
    spent_at: "2022-02-23T14:47:20.381"
},
{
    description: "Hungarian mango",
    amount: 1200,
    currency: "HUF",
    spent_at: "2022-02-23T14:47:20.381"
}];


it('shows spendings', async () => {
    
    // Given

    jest.spyOn(global, "fetch").mockImplementation(
        () => {
            return Promise.resolve(
            {
                json: () => Promise.resolve(spendings)
            }
        )}
    );

    // When

    await act(async () => render(<SpendingList spendings={[]} setSpendings={() => {}} ordering='-spent_at' filtering={null}/>));

    // Then
    expect(global.fetch).toBeCalledWith(`http://localhost:5000/spendings/?order_by=-spent_at`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
});

it('applies filter', async () => {
    
    // Given

    jest.spyOn(global, "fetch").mockImplementation(
        () => {
            return Promise.resolve(
            {
                json: () => Promise.resolve(spendings)
            }
        )}
    );

    // When

    await act(async () => render(<SpendingList
        spendings={[]}
        setSpendings={() => {}}
        ordering='-spent_at'
        filtering={'HUF'}/>
    ));

    // Then
    expect(global.fetch).toBeCalledWith(`http://localhost:5000/spendings/?order_by=-spent_at&filtering=HUF`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
});
