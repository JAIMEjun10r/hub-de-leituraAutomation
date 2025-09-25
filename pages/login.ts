import { Page, expect } from '@playwright/test';
import { loginForm } from '../ymlValidation/loginYml';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sucessfulLogin(email: string, password: string) {
    await this.page.getByRole('link', { name: ' ENTRAR' }).click();
    await expect(this.page.locator('#login-form')).toMatchAriaSnapshot(loginForm);

    await this.page.getByRole('textbox', { name: ' Email *' }).fill(email);
    await this.page.getByRole('textbox', { name: ' Senha *' }).fill(password);
    await this.page.getByRole('button', { name: ' Entrar' }).click();
    
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const USER_EMAIL = process.env.USER_EMAIL;
    
    let expectedMessage: string;
    
    if (email === ADMIN_EMAIL) {
      expectedMessage = ' Bibliotecário Admin ';
    } else if (email === USER_EMAIL) {
      expectedMessage = ' Usuário Padrão';
    } else {
      throw new Error(`Usuário fora do escopo de teste: ${email}. `);
    }
    
    await expect(this.page.getByRole('link', { name: expectedMessage })).toBeVisible();
  }

  async invalidCredentials(email: string = '', senha: string = '') {
    await this.page.getByRole('link', { name: ' ENTRAR' }).click();
    await this.page.getByRole('textbox', { name: ' Email *' }).fill(email);
    await this.page.getByRole('textbox', { name: ' Senha *' }).fill(senha);
    await this.page.getByRole('button', { name: ' Entrar' }).click();
  }
  
  async errorMessageEmail(message: string) {
    await expect(this.page.locator('#login-form')).toContainText(message)
  };
}