(function () {
  'use strict';

  function createValidationQueries (inputs) {
    return Array.from(inputs).map(input => ({
      name: input.name,
      type: input.dataset.validation,
      value: input.value
    }));
  }

  function validateItem() {
  }

  function validateForm(form) {
    const result = {
      get isValid() {
        return this.errors.length === 0;
      },

      errors: []
    };

    const inputs = Array.from(form.querySelectorAll('input'));

    for (let validation of createValidationQueries(form.querySelectorAll('input'))) {
      if (validation.type === 'alphabetical') {
        let isValid = /^[a-z]+$/i.test(validation.value);

        if (!isValid) {
          result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
        }
      } else if (validation.type === 'numeric') {
        let isValid = /^[0-9]+$/.test(validation.value);

        if (!isValid) {
          result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
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
      it('should validate a form with all of the possible validation types', () => {
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

    describe('th createValidationQueries function', () => {
    let form = document.querySelector('.test-form');

      it('should map input elements with a data-validation attribute to an array of validation objects', () => {
      const name = form.querySelector('input[name="first-name"]');
        const age  = form.querySelector('input[name="age"]');

        name.value = 'Bob';
        age.value  = '42';

        const validations = createValidationQueries([name, age]);

        expect(validations.length).to.equal(2);

        expect(validations[0].name).to.equal('first-name');
        expect(validations[0].type).to.equal('alphabetical');
        expect(validations[0].value).to.equal('Bob');

        expect(validations[1].name).to.equal('age');
        expect(validations[1].type).to.equal('numeric');
        expect(validations[1].value).to.equal('42');
      });
    });
  });

  mocha.run();
}());
