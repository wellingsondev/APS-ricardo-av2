import { describe, test, expect } from "vitest";

describe("Produtos", () => {

  test("produto possui nome", () => {

    const produto = {
      nome: "Mouse"
    };

    expect(produto.nome).toBe("Mouse");

  });

  test("estoque maior que zero", () => {

    const estoque = 10;

    expect(estoque > 0).toBe(true);

  });

});