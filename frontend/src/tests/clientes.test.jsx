import { describe, test, expect } from "vitest";

describe("Clientes", () => {

  test("cliente possui nome", () => {

    const cliente = {
      nome: "Paulo"
    };

    expect(cliente.nome).toBe("Paulo");

  });

});