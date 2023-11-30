import Product from '../../models/Product.js';
import RatingDetail from '../../models/RatingDetail.js';
import { doesProductExistById , validateUserExist} from '../methods/validations.js';
/**
 * Saves a new Product.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const saveNewProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

/**
 * Edits a Product by its ID.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const editProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Deletes a Product by its ID.
 * 
 * @param {*} req- The request object.
 * @param {*} res - The response object.
 */
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Update the availability of the product by ID.
 * 
 * @param {*} req- The request object.
 * @param {*} res - The response object.
 */
export const updateAvailability = async (req, res) => {
  try {
    const { productId } = req.params.id;
    const { availability } = req.body;
    const updateAvailability = await Product.findByIdAndUpdate(productId, { availability }, { new: false });
    if (!updateAvailability) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updateAvailability);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}


/**
 * Saves the rating for a product.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the rating is saved successfully.
 */
export const modifyRatingProduct = async (req, res) => {
  const { tokenUser, productId, rating, decrease} = req.body;
  try{
    const userExist = await validateUserExist(tokenUser);
    if(!userExist){
      return res.status(400).json({ error: 'User not found' });
    }
    const producExist = await doesProductExistById(productId);
    if(!producExist){
      return res.status(400).json({ error: 'Product not found' });
    }

    if(!validateRating(rating)){
      return res.status(400).json({ error: 'Rating invalid' });
    }

    await createRatingDetail(productId);

    const response = await RatingDetail.findOne({productId: productId});

    switch(rating){
      case 1:
        if(decrease){
          if(response.rating_1 > 0){
            response.rating_1 -= 1;
          }
        }else{
          response.rating_1 += 1;
        }
        break;
      case 2:
        if(decrease){
          if(response.rating_2 > 0){
            response.rating_2 -= 1;
          }
        }else{
          response.rating_2 += 1;
        }
        break;
      case 3:
        if(decrease){
          if(response.rating_3 > 0){
            response.rating_3 -= 1;
          }
        }else{
          response.rating_3 += 1;
        }
        break;
      case 4:
        if(decrease){
          if(response.rating_4 > 0){
            response.rating_4 -= 1;
          }
        }else{
          response.rating_4 += 1;
        }
        break;
      case 5:
        if(decrease){
          if(response.rating_5 > 0){
            response.rating_5 -= 1;
          }
        }else{
          response.rating_5 += 1;
        }
        break;
    }

   

    const totalRatings = response.rating_1 + response.rating_2 + response.rating_3 + response.rating_4 + response.rating_5;
   
    let totalRating = 0;
      if(totalRatings === 0){
        response.totalRating = 0;
      }
      else{
        totalRating = parseFloat(((response.rating_1  + response.rating_2 * 2 + response.rating_3  * 3 + response.rating_4 * 4 + response.rating_5 * 5) / totalRatings).toFixed(1));
        response.totalRating = totalRating;
      }
      
    await response.save();
    updateTotalRatingToProduct(productId, totalRating);
    res.status(200).json({ message: 'Rating saved successfully' });
  
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get the rating detail of a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the rating detail or an error message.
 */
export const getRatingDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    let ratingDetail = await RatingDetail.findOne({ productId: productId });
    if (!ratingDetail) {
      await createRatingDetail(productId);
      updateTotalRatingToProduct(productId, 0);
      ratingDetail = await RatingDetail.findOne({ productId: productId });
      //return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(ratingDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Validates the rating value.
 * @param {number} rating - The rating value to be validated.
 * @returns {boolean} - Returns true if the rating is valid, false otherwise.
 */
const validateRating = (rating) => {
  if(rating < 1 || rating > 5){
    return false;
  }
  return true;
}

/**
 * Creates a rating detail for a product.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<void>} - A promise that resolves when the rating detail is created.
 */
const createRatingDetail = async (productId) => {
  const response = await RatingDetail.findOne({productId: productId});
  if(!response){
    const newRatingDetail = new RatingDetail({
      productId: productId,
      rating_1: 0,
      rating_2: 0,
      rating_3: 0,
      rating_4: 0,
      rating_5: 0,
      totalRating: 0
    });
    await newRatingDetail.save();
  }
}

/**
 * Updates the total rating of a product.
 * @param {string} productId - The ID of the product.
 * @param {number} totalRating - The new total rating for the product.
 * @returns {boolean} - Returns true if the update is successful, false otherwise.
 */
const updateTotalRatingToProduct = async (productId, totalRating) => {
  try {
    const response = await Product.findById(productId);
    response.rating = totalRating;
    await response.save();
  }catch(error){
    return false;
  }
}
 

