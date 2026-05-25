# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sistema.spec.js >> abre sistema
- Location: tests\sistema.spec.js:3:1

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /React|Vite/i
Received string:  "frontend"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value "frontend"

```

```yaml
- heading "Sistema de Vendas" [level=1]
- textbox "Usuário"
- textbox "Senha"
- button "Entrar"
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 | 
  3 | test("abre sistema", async ({ page }) => {
  4 |   await page.goto("http://localhost:5173");
  5 | 
> 6 |   await expect(page).toHaveTitle(/React|Vite/i);
    |                      ^ Error: expect(page).toHaveTitle(expected) failed
  7 | });
```