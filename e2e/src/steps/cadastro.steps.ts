import {AppPage} from '../pages/mainpage.po';
import {AfterAll, Before, Given, Then, When} from 'cucumber';
import {browser, by, element} from 'protractor';
import {expect} from 'chai';


let page: AppPage;

Before(() => {
    page = new AppPage();
});

Given('Eu estou na paginal inicial', async () => {
    await page.navigateTo();
});

When('clicar em {string}', async (btnEntrar) => {
    await element(by.buttonText(btnEntrar)).click();
    await browser.driver.sleep(3000);
});

Then('devo ser redirecionado para a rota {string}', async (rota) => {
    expect(await browser.driver.getCurrentUrl()).to.includes(rota);
});

When('clicar em criar uma conta',   () => {
   return browser.executeScript(`document.getElementsByTagName('a')[1].click()`);
});

Then('devo ser redirecionado para a pagina {string}', async (rota) => {
    expect(await browser.driver.getCurrentUrl()).to.includes(rota);
});

When('preencher os dados {string}, {string}, {string}, {string}, {string}',  async (nome, sobrenome, email, username, senha) => {
    element(by.css('input[formControlName=name]')).sendKeys(nome);
    await browser.driver.sleep(500);
    element(by.css('input[formControlName=lastName]')).sendKeys(sobrenome);
    await browser.driver.sleep(500);
    element(by.css('input[formControlName=email]')).sendKeys(email);
    await browser.driver.sleep(500);
    element(by.css('input[formControlName=userName]')).sendKeys(username);
    await browser.driver.sleep(500);
    element(by.css('input[formControlName=password]')).sendKeys(senha);
    await browser.driver.sleep(500);
    element(by.css('input[formControlName=confirmPassword]')).sendKeys(senha);
    await browser.driver.sleep(500);
});

When('clicar no botão {string}', async (btnProximo) => {
    element(by.buttonText(btnProximo)).click();
    await browser.driver.sleep(3000);
});

Then('devo ser redirecionado tela {string}', async (rota) => {
    expect(await browser.driver.getCurrentUrl()).to.includes(rota);
});


AfterAll( async () => {
   await browser.close();
});
