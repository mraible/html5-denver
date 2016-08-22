import { Html5DenverPage } from './app.po';

describe('html5-denver App', function() {
  let page: Html5DenverPage;

  beforeEach(() => {
    page = new Html5DenverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
