var Nightmare = require('nightmare'),
  nightmare = Nightmare({
    show: true
  });

var random = Math.floor(Math.random() * 1000)

  nightmare
    .goto('https://ucbmyschoolmanager.herokuapp.com/signup/user')
    .wait(5000)
    .cookies.clearAll()
    .insert('input[name="firstName"]', '')
    .type('input[name="firstName"]', 'Testy')
    .insert('input[name="lastName"]', '')
    .type('input[name="lastName"]', 'McTesta')
    .insert('input[name="address1"]', '')
    .type('input[name="address1"]', '123 Elm Street')
    .insert('input[name="address2"]', '')
    .type('input[name="address2"]', 'Apt 4')
    .insert('input[name="zip"]', '')
    .type('input[name="zip"]', '54321')
    .insert('input[name="city"]', '')
    .type('input[name="city"]', 'Sunnyvale')
    .select('select[name="state"]', 'CA')
    .select('select[name="country"]', 'US')
    .insert('input[name="phone"]', '')
    .type('input[name="phone"]', '333-222-1111')
    .insert('input[name="email"]', '')
    .type('input[name="email"]', 'mctest' + random + '@yahoo.com')
    .insert('input[name="password"]', '')
    .type('input[name="password"]', 'password')
    .click('#signupUserSubmit')
    .wait('#signupSchoolSubmit')
    .evaluate(function() {
      return document.querySelector('.title').textContent;
    })
    .end()
    .then(function(result) {
      console.log(result);
      console.log('It worked!')
    })
    .catch(function(error) {
      console.log('an error has occurred: ' + error);
    })
