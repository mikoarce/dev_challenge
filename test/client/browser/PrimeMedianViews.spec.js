import { expect } from 'chai';
import puppeteer from 'puppeteer';

const msgSelector = 'div.ui.message > .content';
const successMsgSelector = 'div.ui.message.success > .content';
const errorMsgSelector = 'div.ui.message.error > .content';
const formSelector = '.prime-median-form';
const formButtonSelector = `${formSelector} button`;
const formInputSelector = `${formSelector} input`;
const pointingErrorLabelSelector = `${formSelector} .error.field .pointing.label`;

describe('Prime Median Page', function() {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch();
  });

  beforeEach(async function() {
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterEach(async function() {
    await page.close();
  });

  describe('when page loads', function() {
    it('displays a placeholder message in place of the result message', async function() {
      const element = await page.$(msgSelector);
      const text = await page.evaluate((el) => el.textContent, element);
      expect(text).to.equal('Results will show up here');
    });

    it('starts the page with a disabled submit button', async function() {
      const element = await page.$(`${formButtonSelector}.disabled`);
      expect(element).to.not.be.undefined;
    });

    it('does not have a default value in the Max Number field', async function() {
      const element = await page.$(formInputSelector);
      const text = await page.evaluate((el) => el.value, element);
      expect(text).to.be.empty;
    });
  });

  describe('when manipulating the Max field', function() {
    it('disables the submit button when field is empty', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('5');
      let isEnabled = (await page.$(`${formButtonSelector}.disabled`)) === null;
      expect(isEnabled, 'Prerequisite failed: button must be enabled').to.be.true;

      const inputEl = await page.$(formInputSelector);
      await inputEl.click({ clickCount: 2 });
      await page.keyboard.press('Backspace');
      isEnabled = (await page.$(`${formButtonSelector}.disabled`)) === null;
      expect(isEnabled).to.be.false;
    });

    it('shows an error and disables the submit button when value is not a number', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('a');

      const errorLabel = await page.$(pointingErrorLabelSelector);
      const text = await page.evaluate((el) => el.textContent, errorLabel);
      expect(text).to.equal('Input must be a whole number');
    });

    it('shows an error and disables the submit button when value is less than or equal to 0', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('0');

      const errorLabel = await page.$(pointingErrorLabelSelector);
      const text = await page.evaluate((el) => el.textContent, errorLabel);
      expect(text).to.equal('Input must be greater than 0');
    });

    it('shows an error and disables the submit button when value is a floating point number', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('1.5');

      const errorLabel = await page.$(pointingErrorLabelSelector);
      const text = await page.evaluate((el) => el.textContent, errorLabel);
      expect(text).to.equal('Input must be a whole number');
    });

    it('enables the submit button when value is a whole number', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('10');
      const isEnabled = (await page.$(`${formButtonSelector}.disabled`)) === null;
      expect(isEnabled).to.be.true;
    });
  });

  describe('when displaying the result', function() {
    it('displays the median(s) of prime number(s) on a successful request', async function() {
      await page.focus(formInputSelector);
      await page.keyboard.type('10');

      const buttonEl = await page.$(formButtonSelector);
      await buttonEl.click();

      await page.waitForSelector(successMsgSelector, { timeout: 1000 });
      const element = await page.$(successMsgSelector);
      const text = await page.evaluate((el) => el.textContent, element);
      expect(text).to.equal('Median prime number(s): 3, 5');
    });

    it('displays an error message on a failed request', async function() {
      await page.setRequestInterception(true);
      page.on('request', (request) => request.abort());
      await page.focus(formInputSelector);
      await page.keyboard.type('10');

      const buttonEl = await page.$(formButtonSelector);
      await buttonEl.click();

      await page.waitForSelector(errorMsgSelector, { timeout: 1000 });
      const element = await page.$(errorMsgSelector);
      const text = await page.evaluate((el) => el.textContent, element);
      expect(text).to.equal('The following error has occurred: Network Error');
    });
  });
});
