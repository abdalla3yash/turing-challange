/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 * 
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import {
  AttributeValue,
  Attribute,
} from '../database/models';


class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {

    // write code to get all attributes from the database here
    try {
      const attribute = await Attribute.findAll();
      return res.status(200).json(attribute);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    const { attribute_id } = req.params; // eslint-disable-line
    try {
      const attribute = await Attribute.findByPk(attribute_id);
      if (attribute) {
        return res.status(200).json(attribute);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `attribute with id ${attribute_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    const { attribute_id } = req.params; // eslint-disable-line
    try {
      const attribute = await AttributeValue.findByPk(attribute_id);
      if (attribute) {
        return res.status(200).json(attribute);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `attribute with id ${attribute_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    // Write code to get all attribute values for a product using the product id provided in the request param
    const { product_id } = req.params; // eslint-disable-line
    try {
      const attribute = await Attribute.findByPk(product_id);
      if (attribute) {
        return res.status(200).json(attribute);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `product attribute with id ${product_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default AttributeController;
