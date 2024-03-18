import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.js";
import "setimmediate";
/*
// import API mocking utilities from Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

//Necessary for fetch mocking:

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())
*/

//mocking fetch
global.fetch = jest.fn(()=>
    Promise.resolve({
        json: () => Promise.resolve(["food","clothing","animals"])
    })
);

//Ellen's
test("loads home page", async () => {
    render(<App />);

    // starts at home page
    expect(screen.getByText("Fictionary"));
    expect(screen.getByText("Create a Room"));
    await userEvent.click(screen.getByText("Create a Room"));
});

test("loads create a room page", async () => {
    render(<App />);
    
    // create a room page (host page)
    expect(screen.getByText("Enter Your Name (Host):")); 
    const inputElement = document.getElementById("name");
    await userEvent.type(inputElement, "myUsername");
    await userEvent.click(screen.getByText("Enter"));
    // line above causes terminal to show "errors" but these are warnings in react that don't cause any bugs
});

test("loads lobby page", async () => {
    render(<App />);
    
    // testing Lobby.js component
    expect(screen.getByText("Lobby"));
    await userEvent.click(screen.getByText("Start"));
});

/*mock category fetch request
const server = setupServer(
    // capture "GET /categories" request
    rest.get('/categories', (req, res, ctx) => {
      // respond using a mocked JSON body
      const mockData = ["food","clothing","animals"];
      return res(ctx.json(mockData))
    }),
)
*/

test("load category page/display", async ()=>{
    render(<App/>);

    // testing Categories.js component with fetched categories
    await userEvent.click(screen.getByText("Start"));

    //make sure categories are displayed first before checking
    //(fetch request id captured by testing and response data is replaced by mock data)
    await screen.findByText("food");
    await screen.findByText("clothing");
    await screen.findByText("animals"); 

    expect(screen.getByText("food")).toBeInTheDocument();
    expect(screen.getByText("clothing")).toBeInTheDocument();
    expect(screen.getByText("animals")).toBeInTheDocument();

    await userEvent.click(screen.getByText("(this should not be visible)"));

});