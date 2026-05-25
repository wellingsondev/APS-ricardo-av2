import { describe, test, expect } from "vitest";

import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";

describe("Login", () => {

  test("botão entrar aparece", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Entrar")
    ).toBeTruthy();

  });

});