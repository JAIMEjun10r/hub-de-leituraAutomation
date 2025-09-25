import { Page, expect } from "@playwright/test";

export class SearchAndFilters {
  readonly page: Page
  private authorName: string = ''

  constructor(page: Page) {
    this.page = page
  }

  async searchByAuthor(author: string) {
    this.authorName = author;
    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).clear();
    const realPromise = this.page.waitForResponse(response => response.url().includes(`/api/books`) && response.status() === 200)

    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).fill(author);
    await realPromise
    await expect(this.page.locator('#book-list')).toBeVisible()


    const authorCard = this.page.locator('#book-list .card', { hasText: author }).first();
    await authorCard.waitFor({ state: 'visible' });
    const authorElement = this.page.getByText(author, { exact: true })
    await expect(authorElement).toBeVisible()
  }

  async searchByAuthorWithMultipleBooks(author: string) {
    this.authorName = author;
    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).clear()
    const realPromise = this.page.waitForResponse(response => response.url().includes(`/api/books`) && response.status() === 200)

    await this.page.getByRole('textbox', { name: 'Buscar por título, autor ou' }).fill(author)
    await realPromise
    await expect(this.page.locator('#book-list')).toBeVisible()

    
    const authorCard = this.page.locator('#book-list .card', { hasText: author }).first();
    await authorCard.waitFor({ state: 'visible' });
    const allBooks = this.page.locator('#book-list .card')
    const booksByAuthor = this.page.locator('#book-list .card').filter({ hasText: author })

    const allBooksCount = await allBooks.count()
    const booksByAuthorCount = await booksByAuthor.count()

    expect(allBooksCount).toEqual(booksByAuthorCount)
    expect(allBooksCount).toBeGreaterThan(0)
  }
 

  async searchByCategory(category: string) {
    await this.page.locator('#category-filter').selectOption(category);
    await this.page.locator('#book-list').waitFor({ state: 'visible' });
    await this.page.locator('#book-list .card').first().waitFor();

    const allVisibleBooks = this.page.locator('#book-list .card');
    const booksWithCorrectCategory = allVisibleBooks.filter({ hasText: category });

    const allVisibleBooksCount = await allVisibleBooks.count();
    const booksWithCorrectCategoryCount = await booksWithCorrectCategory.count();

    expect(allVisibleBooksCount).toBeGreaterThan(0);
    expect(allVisibleBooksCount).toEqual(booksWithCorrectCategoryCount);
  }
}
