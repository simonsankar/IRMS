import { IRMSPage } from './app.po';

describe('irms App', () => {
  let page: IRMSPage;

  beforeEach(() => {
    page = new IRMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
