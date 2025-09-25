import { chromium, expect } from "@playwright/test";
import { loginForm } from './ymlValidation/loginYml';

const USER_EMAIL = process.env.USER_EMAIL!;
const USER_PASSWORD = process.env.USER_PASSWORD!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function globalSetup() {
  const browser = await chromium.launch();

  //login usuário padrão
  const userPadraoContext = await browser.newContext();
  const userPadraoPage = await userPadraoContext.newPage();
  await userPadraoPage.goto('http://localhost:3000/')
  await userPadraoPage.getByRole('link', { name: ' ENTRAR' }).click();
  await userPadraoPage.waitForSelector('#login-form');

  await userPadraoPage.getByRole('textbox', { name: ' Email *' }).fill(USER_EMAIL!);
  await userPadraoPage.getByRole('textbox', { name: ' Senha *' }).fill(USER_PASSWORD!);
  await userPadraoPage.getByRole('button', { name: ' Entrar' }).click();
  await expect(userPadraoPage.getByRole('link', { name: ' Usuário Padrão' })).toBeVisible();
  await userPadraoContext.storageState({ path: `./playwright/.auth/userPadrao.json` });

  //login usuário admin
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  await adminPage.goto('http://localhost:3000/')
  await adminPage.getByRole('link', { name: ' ENTRAR' }).click();
  await adminPage.waitForSelector('#login-form');

  await adminPage.getByRole('textbox', { name: ' Email *' }).fill(ADMIN_EMAIL!);
  await adminPage.getByRole('textbox', { name: ' Senha *' }).fill(ADMIN_PASSWORD!);
  await adminPage.getByRole('button', { name: ' Entrar' }).click();
  await expect(adminPage.getByRole('link', { name: ' Bibliotecário Admin ' })).toBeVisible();
  await adminContext.storageState({ path: `./playwright/.auth/admin.json` });

  await browser.close();

}

export default globalSetup;