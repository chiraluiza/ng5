import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('ng5 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display home page', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getParagraphText()).toEqual('Home');
  });

  it("should display about page", () => {
    page.navigateTo();
    browser.pause();
    expect(page.getAboutButton().getText()).toEqual('About');
  });
  
  it("should rout to about page", () => {
    page.navigateTo();
    page.getAboutButton().click();
    browser.pause();
    expect(page.getAboutText()).toEqual("Take me back");
  });

});
