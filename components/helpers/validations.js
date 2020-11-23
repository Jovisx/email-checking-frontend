export const pattern = {
  // eslint-disable-next-line no-useless-escape
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&\d]).{8,}$/
};

export function validate(validation, value, props) {
  if (typeof validation === 'string') {
    switch (validation) {
      case 'required':
        return !!value || 'Field required';
      case 'email':
        return pattern.email.test(value) || 'Incorrect Email';
      default:
        return true;
    }
  } else {
    const { type: vt, param: vParam, message } = validation;
    switch (vt) {
      case 'required':
        return !!value || message || 'Field required';
      case 'email':
        return pattern.email.test(value) || message || 'Incorrect Email';
      case 'function':
        return vParam(value) || message || 'Invalid value';
      case 'regexp':
        return vParam.test(value) || message || 'Incorrect input';
      case 'matchLen':
        return (value || '').length === vParam || message || `Input length must be ${vParam}`;
      case 'min':
        return value > vParam || message || `At least ${vParam}`;
      case 'minLen':
        return (value || '').length > vParam || message || `At least length of ${vParam}`;
      case 'maxLen':
        return (value || '').length < vParam || message || `Exceed length of ${vParam}`;
      case 'match':
        return value === props[vParam] || message || `Input mismatch with ${vParam}`;
      case 'text':
        return value === vParam || message || 'Input mismatch';
      case 'strong':
        return pattern.password.test(value) || message || 'Password is not strong';
      default:
        return true;
    }
  }
}
