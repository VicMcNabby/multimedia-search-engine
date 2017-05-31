module.exports = {
  'Index test': function(browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('.landingPage', 1000)
      .setValue('input[class=search]', 'spiderman')
      .click('button')
      .waitForElementVisible('.loading', 1000)
      .waitForElementVisible('.results', 8000)
      .assert.hidden('.landingPage')
      .waitForElementVisible('.bookResults', 1000)
      .waitForElementVisible('.movieResults', 1000)
      .waitForElementVisible('.gameResults', 1000)
      .waitForElementVisible('.card-image', 1000)
      .click('.logo1')
      .waitForElementVisible('.landingPage', 1000)
      .setValue('input[class=search]', 'star wars')
      .click('button')
      .waitForElementVisible('.loading', 1000)
      .waitForElementVisible('.results', 8000)
      .assert.hidden('.landingPage')
      .waitForElementVisible('.bookResults', 1000)
      .waitForElementVisible('.movieResults', 1000)
      .waitForElementVisible('.gameResults', 1000)
      .waitForElementVisible('.card-image', 1000)
      .click('a.waves-effect.waves-light.btn')
      .waitForElementVisible('.modal.open', 1000)
      .click('a.modal-action')
      .assert.hidden('.modal-content')
      .end();
  }
};
