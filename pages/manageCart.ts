import { Page, expect } from "@playwright/test";

export class ManageCart {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** 
  * @description
  * Pega o primeiro livro da lista, clica no botão
  * "Adicionar à Cesta" correspondente, captura o título
  * do livro e verifica se a mensagem de confirmação aparece
  * corretamente na página.
   */
  async addFirstBookToCartAndVerify(): Promise<string> {
    // await this.page.goto('/catalog.html');
    await this.page.waitForSelector('#book-list .card')

    const firstBookCard = this.page.locator('#book-list .card').first()

    const bookTitleElement = firstBookCard.locator('h5.card-title a')
    const bookTitle = await bookTitleElement.textContent()

    if (!bookTitle) {
      throw new Error("Could not find book title")
    }

    const addToCartButton = firstBookCard.locator('button.add-to-cart')
    await addToCartButton.click();

    const trimmedTitle = bookTitle.trim();
    const expectedMessage = `"${trimmedTitle}" foi adicionado à cesta!`;
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
    
    return trimmedTitle;
  }

  async addSecondBookTocartAndVerify(): Promise<string> {
    await this.page.waitForSelector('#book-list .card')

    const secondBookCard = this.page.locator('#book-list .card').nth(1)

    const bookTitleElement = secondBookCard.locator('h5.card-title a')
    const bookTitle2 = await bookTitleElement.textContent()

    if (!bookTitle2) {
      throw new Error("Could not find book title")
    }

    const addToCartButton = secondBookCard.locator('button.add-to-cart')
    await addToCartButton.click();

    const trimmedTitle = bookTitle2.trim();
    const expectedMessage = `"${trimmedTitle}" foi adicionado à cesta!`;
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
    
    return trimmedTitle;
  }

  async viewCartAndVerify(bookTitle: string) {
    await this.page.locator('#cart-count').click();
    await this.page.waitForURL('**/basket.html');
    
    const cartItemTitle = this.page.locator('.card-title', { hasText: bookTitle });
    await expect(cartItemTitle).toBeVisible();
  }

  async removeBookFromCartAndVerify(bookTitle: string) {
    this.page.on('dialog', async dialog => {
      expect(dialog.message()).toBe(`Remover "${bookTitle}" da cesta?`);
      await dialog.accept();
    });

    const bookItem = this.page.locator('.book-item', { hasText: bookTitle });
    
    await bookItem.getByRole('button', { name: '', exact: true }).click();

    const expectedMessage = `"${bookTitle}" foi removido da cesta`;
    await expect(this.page.locator('#alert-container')).toContainText(expectedMessage);
    
    const cartItemTitle = this.page.locator('.card-title', { hasText: bookTitle });
    await expect(cartItemTitle).not.toBeVisible({ timeout: 5000 });
  }
}
