import TOKENS from '../../accessTokens';

const getAccessToken = service => {
  if (!TOKENS) {
    const message = 'Could not find file "accessTokens.js" at root, ' +
      'please store your tokens in a ./accessTokens.js file at the root ' +
      'of your project.';

    console.warn(message); // eslint-disable-line no-console
  }

  if (!TOKENS[service]) {
    throw new Error(`Sorry no token was found for ${service}`);
  }

  return TOKENS[service];
}

export default getAccessToken;
