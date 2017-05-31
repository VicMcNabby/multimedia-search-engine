module.exports = {
  'Index test': function(browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('.landingPage', 1000)
      .setValue('input[class=search]', 'dogs')
      .click('button')
      .waitForElementVisible('.loading', 1000)
      .waitForElementVisible('.results', 8000)
      .waitForElementVisible('.bookResults', 1000)
      .waitForElementVisible('.movieResults', 1000)
      .waitForElementVisible('.gameResults', 1000)
      .waitForElementVisible('.card-image', 1000)
      .end();
  }
};
