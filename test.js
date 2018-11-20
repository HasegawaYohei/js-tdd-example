(function () {
  'use strict';

  function validateForm(form) {
  }

  mocha.setup('bdd');
  const { expect } = chai;

  describe('the form validator', () => {
    let form = document.querySelector('.test-form');

    beforeEach(() => {
      form = form.cloneNode(true);
    });

    describe('the validateForm function', () => {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = 'Bob';
      age.value = '42';

      const result = validateForm(form);
      expect(result.isValid).to.be.true;
      expect(result.errors.length).to.equal(0);
    });
  });

  mocha.run();
}());
