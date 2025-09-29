  const { describe, it, beforeAll, afterAll } = require('@jest/globals');
  const { Verifier } = require('@pact-foundation/pact');
  const path = require('path');

  // This line is critical. It expects an object and pulls 'app' out of it.
  const { app, stateHandlers } = require('../server');

  const PORT = 8081;
  let server;

  beforeAll((done) => {
    // Add a check to see what 'app' is.
    if (typeof app.listen !== 'function') {
      console.error("'app' is not an express app! It is:", app);
      process.exit(1); // Exit with an error
    }
    server = app.listen(PORT, () => {
      console.log(`Product API listening on http://localhost:${PORT}`);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Pact Verification', () => {
    it('validates the expectations of ProductWebApp', () => {
      const opts = {
        provider: 'ProductAPI',
        providerBaseUrl: `http://localhost:${PORT}`,
        // pactUrls: [
        //   path.resolve(process.cwd(), '../product-web-app/pacts/ProductWebApp-ProductAPI.json'),
        // ],
        pactBrokerUrl: 'http://127.0.0.1:9292',
        publishVerificationResult: true, // This is important! It sends the "Verified" status back to the broker.
        providerVersion: '2.0.0', // The version of your API
        consumerVersionSelectors: [{ latest: true }],
        stateHandlers: stateHandlers,
      };

      return new Verifier(opts).verifyProvider();
    });
  });