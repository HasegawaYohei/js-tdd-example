(function () {
  'use strict';

  function validateForm(form) {
    const result = {
      get isValid() {
        return this.errors.length === 0;
      },

      errors: []
    };

    const inputs = Array.from(form.querySelectorAll('input'));

    for (let input of inputs) {
      if (input.dataset.validation === 'alphabetical') {
        let isValid = /^[a-z]+$/i.test(input.value);

        if (!isValid) {
          result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
        }
      } else if (input.dataset.validation === 'numeric') {
        let isValid = /^[0-9]+$/.test(input.value);

        if (!isValid) {
          result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
        }
      }
    }

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

    it('should return an error when a name is invalid', () => {
      const name = form.querySelector('input[name="first-name"]');
      const age  = form.querySelector('input[name="age"]');

      name.value = '!!!';
      age.value  = '42';

      const result = validateForm(form);

      expect(result.isValid).to.be.false;
      expect(result.errors[0]).to.be.instanceof(Error);
      expect(result.errors[0].message).to.equal('!!! is not a valid first-name value');
    });

    it('should return an error when an age is invalid', () => {
      const name = form.querySelector('input[name="first-name"]');
      const age  = form.querySelector('input[name="age"]');

      name.value = 'Greg';
      age.value  = 'a';

      const result = validateForm(form);

      expect(result.isValid).to.be.false;
      expect(result.errors[0]).to.be.instanceof(Error);
      expect(result.errors[0].message).to.equal('a is not a valid age value');
    });

    it('should return multiple errors if more than onefield is invalid', () => {
      const name = form.querySelector('input[name="first-name"]');
      const age  = form.querySelector('input[name="age"]');

      name.value = '!!!';
      age.value  = 'a';

      const result = validateForm(form);

      expect(result.isValid).to.be.false;
      expect(result.errors[0]).to.be.instanceof(Error);
      expect(result.errors[0].message).to.equal('!!! is not a valid first-name value');
      expect(result.errors[1]).to.be.instanceof(Error);
      expect(result.errors[1].message).to.equal('a is not a valid age value');
    });
  });

  mocha.run();
}());
