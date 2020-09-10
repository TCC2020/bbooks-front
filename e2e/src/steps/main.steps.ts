import {AppPage} from '../pages/mainpage.po';
import {Before, Given, Then, When, setDefaultTimeout} from 'cucumber';
import {browser, by, element} from 'protractor';
import {expect} from 'chai';

let page: AppPage;

Before(() => {
    page = new AppPage();
});

Given('I am on the home page', async () => {
    await page.navigateTo();
});

When('I do nothing', () => {
});

Then('I should see the title', async () => {
    expect(await browser.getTitle()).to.equal('Bbooks');
});

When('Eu escrever por {string}', async (pesquisa) => {
    await page.search.sendKeys(pesquisa);
    await browser.driver.sleep(2000);
});
When('apertar em {string}', async (buscar) => {
    page.botaoBuscar = element(by.buttonText(buscar));
    await page.botaoBuscar.click();
    await browser.driver.sleep(3000);
});

When('Eu devo receber um livro com o nome {string}', async (busca) => {
    page.card = element(by.css('.card')).element(by.css('.container')).element(by.tagName('p'));
});
