const { describe, it, beforeAll, afterAll } = require('@jest/globals');
const { Verifier } = require('@pact-foundation/pact');
const { app, stateHandlers } = require('../server');

const PORT = process.env.PORT || 8081;
let server;

beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Product API running on port ${PORT}`);
    done();
  });
});

afterAll((done) =>{ server.close(done)});

describe('Pact Verification', () => {
  it('validates expectations from ProductWebApp', async () => {
    const opts = {
      provider: 'ProductAPI',
      providerBaseUrl: `http://localhost:${PORT}`,
      pactBrokerUrl: process.env.PACT_BROKER_URL || 'http://localhost:9292',
      publishVerificationResult: true,
      providerVersion: process.env.PROVIDER_VERSION || '1.0.0',
      consumerVersionSelectors: [{ latest: true }],
      stateHandlers,
    };

    await new Verifier(opts).verifyProvider();
  });
});
