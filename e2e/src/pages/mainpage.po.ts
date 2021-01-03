import {browser, by, element} from 'protractor';

export class AppPage {
    search = element(by.css('input[formControlName=book]'));

    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    esperar = (milisegundos: number) => {
        browser.driver.sleep(milisegundos);
    }
}
