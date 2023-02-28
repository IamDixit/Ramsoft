import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("UI Loads Properly", () => {
  render(<App />);
  const element = screen.getByText("Trello View").innerHTML;
  expect(element).toHaveLength(11);
});

test("UI To Have three Lanes", () => {
  render(<App />);
  const todo = screen.getByText("Todo").innerHTML;
  const inProgress = screen.getByText("InProgress").innerHTML;
  const done = screen.getByText("Done").innerHTML;
  expect(todo).toBe("Todo");
  expect(inProgress).toBe("InProgress");
  expect(done).toBe("Done");
});

test("Add Card Model Opens on click", () => {
  render(<App />);
  screen.getByText("Add Card").click;
  const modelText = screen.getByText("Add Card").innerHTML;
  expect(modelText).toBe("Add Card");
});
