// A static, valid-looking token for testing.
const VALID_JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtfVp5G6t2yqrAqH-p-h-V6I5t3i3h_G3s';

// A regular expression that matches the structure of a JWT.
const JWT_REGEX = /^Bearer\s[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

// A fixture for creating a new product.
const NEW_PRODUCT_BODY = {
  productName: 'Power Drill',
  productType: 'tool'
};

// Export all the data so our test files can use it.
module.exports = {
  VALID_JWT,
  JWT_REGEX,
  NEW_PRODUCT_BODY,
};