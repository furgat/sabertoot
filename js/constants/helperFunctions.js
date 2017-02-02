export function regexRef() {
  const CODES = {
    URL: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
    AUTH_CODE: /\d{6}/,
    ACCOUNT_NAME: /^[a-z0-9_-]{3,25}$/,
    DOMAIN_NAME: /^[a-z0-9_-]{3,25}$/
  };

  return CODES;
}

export function regexTest(regex, testCase) {
  return regex.test(testCase);
}
