function extractErrors(errors) {
  if (errors.response && errors.response.data) {
    return errors.response.data.errors;
  }
  if (errors.message) {
    return [{ code: 500, message: 'CONNECTION_FAILED' }];
  }
  return [{ code: -1, message: 'SOMETHING_WRONG' }];
}

export default extractErrors;
