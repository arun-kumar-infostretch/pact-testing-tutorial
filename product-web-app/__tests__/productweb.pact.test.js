const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { like, regex } = MatchersV3;
const { getProduct,createProduct } = require('../api');

// Import the shared test data
const { VALID_JWT, JWT_REGEX, NEW_PRODUCT_BODY } = require('./test-data');

// Configure the Pact mock server
const provider = new PactV3({
  consumer: 'ProductWebApp',
  provider: 'ProductAPI',
});

describe('Product API client', () => {
  // Scenario 1: Successful GET request for an existing product
  it('returns a product by ID', () => {
    provider
      .given('a product with ID 42 exists')
      .uponReceiving('a request for a single product')
      .withRequest({
        method: 'GET',
        path: '/products/42',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: 42,
          name: like('Super Widget'),
          type: 'gadget',
        },
      });

    return provider.executeTest(async (mockServer) => {
      const product = await getProduct(42, mockServer.url);
      expect(product).not.toBeNull();
      expect(product.id).toBe(42);
    });
  });

  // Scenario 2: GET request for a product that does not exist
  it('handles a product not being found', () => {
    provider
      .given('a product with ID 99 does not exist')
      .uponReceiving('a request for a product that does not exist')
      .withRequest({
        method: 'GET',
        path: '/products/99',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 404,
      });

    return provider.executeTest(async (mockServer) => {
      const product = await getProduct(99, mockServer.url);
      expect(product).toBeNull();
    });
  });

  // Scenario 3: Successful POST request to create a new product
  it('creates a new product with authentication', () => {
    provider
      .given('the user is authenticated')
      .uponReceiving('a request to create a new product')
      .withRequest({
        method: 'POST',
        path: '/products',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': regex(VALID_JWT, JWT_REGEX)
        },
        body: NEW_PRODUCT_BODY
      })
      .willRespondWith({
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: like(100),
          name: NEW_PRODUCT_BODY.productName,
          type: NEW_PRODUCT_BODY.productType
        }
      });

    return provider.executeTest(async (mockServer) => {
      const newProduct = await createProduct(NEW_PRODUCT_BODY, VALID_JWT, mockServer.url);
      expect(newProduct.status).not.toBeNull();
      expect(newProduct.name).toBe('Power Drill');
    });
  });
});