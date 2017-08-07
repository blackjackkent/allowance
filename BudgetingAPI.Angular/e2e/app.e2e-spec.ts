import { BudgetingAPI.FrontEndPage } from './app.po';

describe('budgeting-api.front-end App', () => {
  let page: BudgetingAPI.FrontEndPage;

  beforeEach(() => {
    page = new BudgetingAPI.FrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
