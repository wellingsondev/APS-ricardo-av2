import { describe, test, expect } from "vitest";

describe("Funcionário", () => {

  test("funcionário possui cargo", () => {

    const funcionario = {
      cargo: "Vendedor"
    };

    expect(funcionario.cargo).toBe("Vendedor");

  });

});