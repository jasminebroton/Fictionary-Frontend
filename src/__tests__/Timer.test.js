import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.js";
import "setimmediate";

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

test("loads timer in categories page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));

    // testing timer in Categories.js component
    expect(screen.getByText("1:00"));
    expect(screen.getByText("Vote for a Category"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
});

test("loads timer in drawing page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));

    // testing timer in Drawing.js component
    expect(screen.getByText("3:00"));
    expect(screen.getByText("Drawing Tools"));
    await userEvent.click(screen.getByText("Submit Drawing"));
});

test("loads timer in voting page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByText("Submit Drawing"));

    // testing timer in Voting.js component
    expect(screen.getByText("01:00"));
    expect(screen.getByText("CATEGORY IS"));
    await userEvent.click(screen.getByText("Submit"));
});

test("reloads timer in categories page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));

    // testing timer again in categories
    expect(screen.getByText("1:00"));
    expect(screen.getByText("Vote for a Category"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
});

test("reloads timer in drawing page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));
    await userEvent.click(screen.getByText("(this should not be visible)"));

    // testing timer again in drawing
    expect(screen.getByText("3:00"));
    expect(screen.getByText("Drawing Tools"));
    await userEvent.click(screen.getByText("Submit Drawing"));
});

test("reloads timer in voting page", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Start"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByText("Submit Drawing"));
    await userEvent.click(screen.getByText("Submit"));
    await userEvent.click(screen.getByTestId("results-ctn-btn"));
    await userEvent.click(screen.getByTestId("scoreboard-ctn-btn"));
    await userEvent.click(screen.getByText("(this should not be visible)"));
    await userEvent.click(screen.getByText("Submit Drawing"));

    // testing timer again in voting
    expect(screen.getByText("01:00"));
    expect(screen.getByText("CATEGORY IS"));
    await userEvent.click(screen.getByText("Submit"));
});