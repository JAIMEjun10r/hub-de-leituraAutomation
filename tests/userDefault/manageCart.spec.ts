import { test } from '../../support/index';

test.use({ storageState: './playwright/.auth/userPadrao.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog.html');
  });

test('View item in cart', async ({ page }) => {
  const bookTitle = await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.viewCartAndVerify(bookTitle);
});

test('Remove item from cart', async ({ page }) => {
  const bookTitle = await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.viewCartAndVerify(bookTitle);
  await page.manageCart.removeBookFromCartAndVerify(bookTitle);
  await page.shoppingCart.validateCartItemCounter(0);
});

test('Change item quantity in cart', async ({ page }) => {
  await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.addSecondBookTocartAndVerify();
  await page.shoppingCart.validateCartItemCounter(2);
});
