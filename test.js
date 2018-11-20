(function () {
  'use strict';

  function validateForm(form) {
    const result = {
      errors: []
    };

    const inputs = Array.from(form.querySelectorAll('input'));
    let isValid = true;

    for (let input of inputs) {
      if (input.dataset.validation === 'alphabetical') {
        isValid = isValid && /^[a-z]+$/i.test(input.value);
      } else if (input.dataset.validation === 'numeric') {
        isValid = isValid && /^[0-9]+$/.test(input.value);
      }
    }

    result.isValid = isValid;
    return result;
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
