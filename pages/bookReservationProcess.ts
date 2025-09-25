import { Page, expect } from "@playwright/test";
import { ManageCart } from "./manageCart";
import { ShoppingCart } from "./shoppingCart";
import { bookReservationHeader, bookReservationConfirmText } from "../ymlValidation/bookReservationYml";

export class BookReservationProcess {
    readonly page: Page;
    readonly manageCart: ManageCart;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.manageCart = new ManageCart(page);
        this.shoppingCart = new ShoppingCart(page);

    }

    async clickFinalizeReservation() {
        await this.page.getByRole('button', { name: ' Finalizar Reservas' }).click();
        await expect(this.page.locator('section')).toMatchAriaSnapshot(bookReservationHeader);
    }

    async fillPersonDetails(withdrawalPreference: string) {
        const preferenceValueMap = {
            'Manhã': 'morning',
            'Tarde': 'afternoon',
            'Qualquer horário': 'any'
        };
        const preferenceValue = preferenceValueMap[withdrawalPreference];

        
        await this.page.getByRole('textbox', { name: 'Telefone para contato' }).fill('31999457889');
        await this.page.locator('#pickup-preference').selectOption(preferenceValue);



    }

    async agreeWithLibraryTerms() {
        await this.page.getByRole('checkbox', { name: 'Li e concordo com os termos e' }).check()

    }

    async clickConfirmReservation() {
        await this.page.getByRole('button', { name: ' Confirmar Reservas' }).click()
        const txtConfirmReservation = this.page.getByText('Reservas Confirmadas! Suas')
        const txtConfirmReservationSuccess = this.page.locator('#success-confirmation')
        await expect(txtConfirmReservation).toBeVisible();
        await expect(txtConfirmReservationSuccess).toMatchAriaSnapshot(bookReservationConfirmText)

    }

    async completeReservationFlow(withdrawalPreference: string) {
        const bookTitle = await this.manageCart.addFirstBookToCartAndVerify();
        await this.shoppingCart.validateCartItemCounter(1);
        await this.manageCart.viewCartAndVerify(bookTitle);
        await this.clickFinalizeReservation();
        await this.fillPersonDetails(withdrawalPreference);

    }
}
