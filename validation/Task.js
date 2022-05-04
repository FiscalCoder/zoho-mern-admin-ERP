const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data, keyName) {
    let errors = {};
    data[keyName] = !isEmpty(data[keyName]) ? data[keyName] : "";
    if (Validator.isEmpty(data[keyName])) {
        errors.email = `${keyName} field is required`;
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};