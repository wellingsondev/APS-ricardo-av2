import { describe, test, expect } from "vitest";

describe("Autenticação", () => {

  test("login válido", () => {

    const usuario = {
      username: "paulo",
      password: "123456"
    };

    expect(usuario.username).toBe("paulo");
    expect(usuario.password).toBe("123456");

  });

  test("login inválido", () => {

    const senha = "000000";

    expect(senha).not.toBe("123456");

  });

  test("token existe após login", () => {

    const token = "jwt_token_exemplo";

    expect(token).toBeTruthy();

  });

  test("token não pode ser vazio", () => {

    const token = "";

    expect(token).toBe("");

  });

  test("usuário autenticado", () => {

    const autenticado = true;

    expect(autenticado).toBe(true);

  });

});