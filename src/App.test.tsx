import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/* 
Features:
• Es wird angezeigt, wenn es noch gar keine To-dos gibt.
• Es können neue To-dos angelegt werden.
• ein To-do besteht mindestens aus einem freiwählbaren Titel 
• Es werden alle OFFENen To-dos angezeigt
• Ein To-do kann als "ERLEDIGT" markiert werden.
• Wenn ein To-do als erledigt markiert wird, dann wird es nicht mehr angezeigt.
• Die offenen To-dos werden auch bei einem Neuladen des Browsers wieder angezeigt. 
*/

describe("App should,", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("display 'keine To-Dos' when there are no To-Dos.", async () => {
    render(<App />);
    expect(await screen.findByText(/keine To-Dos/i)).toBeInTheDocument();
  });

  test("display an text input and create button to provide the ability to create new To-Dos.", async () => {
    render(<App />);
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });
    expect(textInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  test("display the To-Do Title once it is created.", async () => {
    render(<App />);
    const titel = "Some random Text to test this thing.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });
    await userEvent.type(textInput, titel);
    await userEvent.click(createButton);

    const todo = await screen.findByText(titel);
    expect(todo).toBeInTheDocument();
  });

  test("provide an option to mark the To-Do as Erledigt.", async () => {
    render(<App />);
    const titel = "Some random Text to test this thing.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });
    await userEvent.type(textInput, titel);
    await userEvent.click(createButton);

    const doneButton = await screen.findByRole("button", { name: /erledigt/i });
    await userEvent.click(doneButton);
    const todo = await screen.findByText(titel);

    expect(getComputedStyle(todo)).toMatchObject({
      textDecoration: "line-through",
    });
  });

  test("display only the open To-Dos.", async () => {
    render(<App />);
    const openTodoText = "Open.";
    const closedTodoText = "Closed.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });

    await userEvent.type(textInput, closedTodoText);
    await userEvent.click(createButton);

    const doneButton = await screen.findByRole("button", { name: /erledigt/i });
    await userEvent.click(doneButton);

    await userEvent.type(textInput, openTodoText);
    await userEvent.click(createButton);

    const open = await screen.findByText(openTodoText);
    const closed = await screen.findByText(closedTodoText);

    expect(open).toBeVisible();
    expect(closed).not.toBeVisible();
  });

  test("hide the closed To-Dos behind an accordion.", async () => {
    render(<App />);
    const openTodoText = "Open.";
    const closedTodoText = "Closed.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });

    await userEvent.type(textInput, closedTodoText);
    await userEvent.click(createButton);

    const doneButton = await screen.findByRole("button", { name: /erledigt/i });
    await userEvent.click(doneButton);

    await userEvent.type(textInput, openTodoText);
    await userEvent.click(createButton);

    const accordionButton = await screen.findByRole("button", {
      name: /erledigte to-dos/i,
    });

    expect(accordionButton).toBeInTheDocument();
  });

  test("show the closed To-Dos when the accordion is clicked.", async () => {
    render(<App />);
    const openTodoText = "Open.";
    const closedTodoText = "Closed.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });

    await userEvent.type(textInput, closedTodoText);
    await userEvent.click(createButton);

    const doneButton = await screen.findByRole("button", { name: /erledigt/i });
    await userEvent.click(doneButton);

    await userEvent.type(textInput, openTodoText);
    await userEvent.click(createButton);

    const closed = await screen.findByText(closedTodoText);
    const accordionButton = await screen.findByRole("button", {
      name: /erledigte to-dos/i,
    });

    expect(closed).not.toBeVisible();
    await userEvent.click(accordionButton);
    expect(closed).toBeVisible();
  });

  test("save the created To-Dos to local Storage.", async () => {
    render(<App />);
    const openTodoText = "Open.";
    const closedTodoText = "Closed.";
    const textInput = await screen.findByRole("textbox", { name: /titel/i });
    const createButton = await screen.findByRole("button", {
      name: /erstellen/i,
    });

    await userEvent.type(textInput, closedTodoText);
    await userEvent.click(createButton);

    const doneButton = await screen.findByRole("button", { name: /erledigt/i });
    await userEvent.click(doneButton);

    await userEvent.type(textInput, openTodoText);
    await userEvent.click(createButton);

    const todos = localStorage.getItem("todos");
    expect(todos).toBeDefined();
    if (!todos) throw Error("todo is not defined.");

    const parsedTodos = JSON.parse(todos)
    if(!Array.isArray(parsedTodos)) throw new Error("Expecting parsedTodos to be an Array.")
    expect(parsedTodos.find(todo => todo.titel === openTodoText)).toBeDefined()
    expect(parsedTodos.find(todo => todo.titel === closedTodoText)).toBeDefined()
  });

  test("load the To-Dos from local Storage.", async () => {
    const openTodoText = "Open.";
    const closedTodoText = "Closed.";

    localStorage.setItem(
      "todos",
      JSON.stringify([
        { id: 0, titel: openTodoText, open: true },
        { id: 1, titel: closedTodoText, open: false },
      ])
    );

    render(<App />);
    const open = await screen.findByText(openTodoText);
    const closed = await screen.findByText(closedTodoText);

    expect(open).toBeVisible();
    expect(closed).not.toBeVisible();
  });
});
