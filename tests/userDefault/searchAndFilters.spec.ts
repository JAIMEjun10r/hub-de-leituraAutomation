import { test } from '../../support/index';

test.use({ storageState: './playwright/.auth/userPadrao.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard.html');
});


test('Search for a book filtering by author with only one book', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  
  const authorCard = page.locator('#book-list .card', { hasText: 'Franz Kafka' }).first();
  await authorCard.waitFor({ state: 'visible' });
  await page.searchAndFilters.searchByAuthor('Franz Kafka');

});

test('Search for a book filtering by author with multiple books', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  
  const authorCard = page.locator('#book-list .card', { hasText: 'George Orwell' }).first();
  await authorCard.waitFor({ state: 'visible' });
  await page.searchAndFilters.searchByAuthorWithMultipleBooks('George Orwell');

});

test('Search for a book filtering by category', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  await page.searchAndFilters.searchByCategory('Ficção');

})