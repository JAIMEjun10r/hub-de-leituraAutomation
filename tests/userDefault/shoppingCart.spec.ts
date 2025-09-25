import { test } from '../../support/index';

  test.use({ storageState: './playwright/.auth/userPadrao.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard.html');
  });

  test('Add book to cart', async ({ page }) => {
    await page.shoppingCart.startBookSearchFromDashboard();
    await page.shoppingCart.serchingForBook('1984');
    await page.shoppingCart.addingToCart();
  });

  test('Add multiple books to cart', async ({ page }) => {
    await page.shoppingCart.startBookSearchFromDashboard();
    await page.shoppingCart.serchingForBook('1984');
    await page.shoppingCart.addingToCart();
    await page.shoppingCart.serchingForBook('A metamorfose');
    await page.shoppingCart.addingToCart();
  });

  test('Add book already existing in cart', async ({ page }) => {
    await page.shoppingCart.startBookSearchFromDashboard();
    await page.shoppingCart.serchingForBook('1984');
    await page.shoppingCart.addingToCart();
    await page.shoppingCart.serchingForBook('1984');
    await page.shoppingCart.duplicatedBook();
  });

  test('Validate cart item counter', async ({ page }) => {
    await page.shoppingCart.startBookSearchFromDashboard();
    await page.shoppingCart.serchingForBook('1984');
    await page.shoppingCart.addingToCart();
    await page.shoppingCart.serchingForBook('A metamorfose');
    await page.shoppingCart.addingToCart();
    await page.shoppingCart.validateCartItemCounter(2);
  });




