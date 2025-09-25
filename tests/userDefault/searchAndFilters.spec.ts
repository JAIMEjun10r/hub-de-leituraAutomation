import { test } from '../../support/index';

test.use({ storageState: './playwright/.auth/userPadrao.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard.html');
});


test.skip('Search for a book filtering by author with only one book', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  await page.searchAndFilters.searchByAuthor('Franz Kafka');

});

test('Search for a book filtering by author with multiple books', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  await page.searchAndFilters.searchByAuthorWithMultipleBooks('George Orwell');

});

test('Search for a book filtering by category', async ({ page }) => {
  await page.shoppingCart.startBookSearchFromDashboard();
  await page.searchAndFilters.searchByCategory('Ficção');

})