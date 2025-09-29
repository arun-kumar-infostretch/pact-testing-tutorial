const axios = require('axios');

const getProduct = async (id, baseUrl) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${id}`,{
           headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    // Handle cases where the product is not found, etc.
    return null;
  }
};

const createProduct= async (productData, token, baseUrl) => {

  try {
    const response = await axios.post(`${baseUrl}/products`,productData,{
           headers: {
        'Accept': 'application/json',
        'Authorization': token,
      }
    });
    return response.data;
  }catch (error) {
    // Handle cases where the product creation fails, etc.
    return null;
  }
};

module.exports = {
  getProduct,
  createProduct,
};