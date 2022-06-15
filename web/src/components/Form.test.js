import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

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

it('save adds new spending', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form />, div);

    const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );

    ReactDOM.unmountComponentAtNode(div);

});
