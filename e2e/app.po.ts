import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root ul li a')).getText();
  }

  getAboutButton() {
    return element(by.css('[routerlink="about/48"]'));
  }

  getAboutText() {
    return element(by.css('app-about p a')).getText();
  }

}
