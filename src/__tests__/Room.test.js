import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.js";
import "setimmediate";
// when running npm test, NODE_ENV is set to "test"

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

test("loads categories page", async () => {
    render(<App />);

    await userEvent.click(screen.getByText("Start"));

    // testing Categories.js component
    expect(screen.getByText("Vote for a Category"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
});

test("loads drawing page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByTestId("next"));
    // testing Drawing.js component
    expect(screen.getByText("Drawing Tools"));
    await userEvent.click(screen.getByText("Submit Drawing"));
});

test("loads voting page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByTestId("next")); 
    await userEvent.click(screen.getByText("Submit Drawing"));

    // testing Voting.js component
    expect(screen.getByText("CATEGORY IS"));
    await userEvent.click(screen.getByText("Submit"));
});

test("loads results page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByTestId("next"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));

    // testing Results.js component
    expect(screen.getByText("Everyone's Guesses"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
});

test("loads scoreboard page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByTestId("next"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));

    // testing Scoreboard.js component
    expect(screen.getByText("Scores:"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));
});

test("loads new round (back to categories page)", async () => {
    render(<App />);
    //this simulates a full round being completed in a room with 3 players
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByTestId("next"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));

    await userEvent.click(screen.getByTestId("next"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));

    await userEvent.click(screen.getByTestId("next"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));

    // back to Categories.js component
    expect(screen.getByText("Vote for a Category"));
});