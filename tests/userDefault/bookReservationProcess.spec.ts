import { test } from '../../support/index';


test.use({ storageState: './playwright/.auth/userPadrao.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/catalog.html');
});


test('Complete reservation flow - Manhã', async ({ page }) => {
  const bookTitle = await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.viewCartAndVerify(bookTitle);
  await page.bookReservationProcess.clickFinalizeReservation();
  await page.bookReservationProcess.fillPersonDetails('Manhã');
  await page.bookReservationProcess.agreeWithLibraryTerms();
  await page.bookReservationProcess.clickConfirmReservation();

})

test('Complete reservation flow - Tarde', async ({ page }) => {
  const bookTitle = await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.viewCartAndVerify(bookTitle);
  await page.bookReservationProcess.clickFinalizeReservation();
  await page.bookReservationProcess.fillPersonDetails('Tarde');
  await page.bookReservationProcess.agreeWithLibraryTerms();
  await page.bookReservationProcess.clickConfirmReservation();

})

test('Complete reservation flow - Qualquer horário', async ({ page }) => {
  const bookTitle = await page.manageCart.addFirstBookToCartAndVerify();
  await page.shoppingCart.validateCartItemCounter(1);
  await page.manageCart.viewCartAndVerify(bookTitle);
  await page.bookReservationProcess.clickFinalizeReservation();
  await page.bookReservationProcess.fillPersonDetails('Qualquer horário');
  await page.bookReservationProcess.agreeWithLibraryTerms();
  await page.bookReservationProcess.clickConfirmReservation();

})

