import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ShoppingCart } from '../pages/shoppingCart';
import { SearchAndFilters } from '../pages/searchAndFilters';
import { ManageCart } from '../pages/manageCart';
import { BookReservationProcess } from '../pages/bookReservationProcess';


const test = base.extend<{ page: any}>({
  page: async ({ page }, use) => {
    page.login = new LoginPage(page);
    page.shoppingCart = new ShoppingCart(page);
    page.searchAndFilters = new SearchAndFilters(page);
    page.manageCart = new ManageCart(page);
    page.bookReservationProcess = new BookReservationProcess(page);

    await use(page)
  }
})
export {test}