import {AppPage} from '../pages/mainpage.po';
import {AfterAll, Before, Given, When} from 'cucumber';
import {browser, by, element} from "protractor";


let page: AppPage;

Before(() => {
    page = new AppPage();
});

Given('Eu estou na paginal inicial', async () => {
    await page.navigateTo();
});

When('clicar em {string}', async (btnEntrar) => {
    page.botaoBuscar = element(by.buttonText(btnEntrar));
    await page.botaoBuscar.click();
    await browser.driver.sleep(3000);
});

When('clicar em criar uma conta', async (btnEntrar) => {
    page.botaoBuscar = element(by.id('btnEntrar'));
    await page.botaoBuscar.click();
    await browser.driver.sleep(3000);
});

AfterAll( async () => {
   await browser.close();
});
