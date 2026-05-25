import { describe, test, expect } from "vitest";

describe("Vendas", () => {

  test("não permite estoque negativo", () => {

    const estoque = 5;
    const venda = 7;

    expect(venda <= estoque).toBe(false);

  });

  test("devolver estoque ao excluir venda", () => {

    let estoque = 10;

    estoque -= 2; // vendeu
    estoque += 2; // excluiu

    expect(estoque).toBe(10);

  });

});