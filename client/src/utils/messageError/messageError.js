export default function showMessageError(error) {
  let { message: messageError } = error.response.data;
  const indexMessageError = messageError.lastIndexOf(":", messageError.length);
  if (indexMessageError !== -1) {
    messageError = messageError
      .slice(indexMessageError)
      .replace(":", "")
      .trim();
  }
  return messageError;
}
