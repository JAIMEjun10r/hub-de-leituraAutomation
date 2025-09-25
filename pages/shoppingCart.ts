import { Page,expect } from '@playwright/test';

export class ShoppingCart {
  readonly page: Page;
  private bookName: string = '';

  constructor(page: Page) {
    this.page = page;
  }

  async startBookSearchFromDashboard() {
    await this.page.getByRole('link', { name: ' Buscar Livros' }).click();
    await this.page.waitForURL('**/catalog.html');
  }

  async serchingForBook(name: string){    
    this.bookName = name
    
    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).clear()

    const responsePromise = this.page.waitForResponse(
      response => response.url().includes(`/api/books`) && response.status() === 200
    )

    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).fill(name)
    await responsePromise
    await expect(this.page.locator('#book-list')).toBeVisible()

    const nameOfTheBook = this.page.getByRole('link', { name: name })
    await expect(nameOfTheBook).toBeVisible()
  }

  async addingToCart(){
    await this.page.getByRole('button', { name: ' Adicionar à Cesta' }).click();
    await expect(this.page.getByText(`"${this.bookName}" foi adicionado à cesta!`)).toBeVisible();
    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).clear()

  }

  async duplicatedBook(){
    await this.page.getByRole('button', { name: ' Adicionar à Cesta' }).click();
    await expect(this.page.getByText(`"${this.bookName}" já está na sua cesta!`)).toBeVisible();
  }

  
  async validateCartItemCounter(numberBooks: number){
    await expect(this.page.locator('#cart-count')).toContainText(numberBooks.toString());
  }

}