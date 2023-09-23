/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 * 
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrderSummary - get the details of an order
 * - processStripePayment - process stripe payment
 * 
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */


import { Order, Customer, Product, ShoppingCart } from '../database/models';
const crypto = require("crypto");

/**
 *
 *
 * @class shoppingCartController
 */
class ShoppingCartController {
  /**
   * generate random unique id for cart identifier
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart_id
   * @memberof shoppingCartController
   */
  static generateUniqueCart(req, res) {
    // implement method to generate unique cart Id
    const id = crypto.randomBytes(16).toString("hex");
    console.log(id);
    return res.status(200).json(id);
  }

  /**
   * adds item to a cart with cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async addItemToCart(req, res, next) {
    // implement function to add item to cart
    try {
      const shoppingcard = await ShoppingCart.create(
        {
          cart_id: req.body.cart_id,
          product_id: req.body.product_id,
          attributes: req.body.attributes,
          quantity: req.body.quantity
        });
      res.json(shoppingcard);
    } catch (err) {
      res.json(err);
    }
  }

  /**
   * get shopping cart using the cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async getCart(req, res, next) {
    const { cart_id } = req.params;  // eslint-disable-line  
    try {
      const shoppingcard = await ShoppingCart.findByPk(cart_id);
      if (shoppingcard) {
        return res.status(200).json(shoppingcard);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `shoppingcard with id ${cart_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update cart item quantity using the item_id in the request param
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async updateCartItem(req, res, next) {
    try {
      const shoppingcard = ShoppingCart.update({
        quantity: req.body.quantity
      },
        {
          where: {
            item_id: req.params.item_id
          }

        }).then(() => {
          res.status(200).json(shoppingcard);
        });
    } catch (err) {
      next(err);
    }
  }

  /**
   * removes all items in a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async emptyCart(req, res, next) {
    // implement method to empty cart
    try {
       await ShoppingCart.destroy({
        where: {
          cart_id: req.params.cart_id
        }
      }).then(() => {
        res.status(200).json( "your cart has been empty!" );
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with message
   * @memberof ShoppingCartController
   */
  static async removeItemFromCart(req, res, next) {
    try {
      ShoppingCart.destroy({
        where: {
          item_id: req.params.item_id
        }
      }).then(() => {
        res.status(200).json({ message: "your item has been deleted successfully!" });
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * create an order from a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with created order
   * @memberof ShoppingCartController
   */
  static async createOrder(req, res, next) {
    try {
      const order = await Order.create(
        {
          cart_id: req.body.cart_id,
          shipping_id: req.body.shipping_id,
          tax_id: req.body.tax_id
        });
      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with customer's orders
   * @memberof ShoppingCartController
   */
  static async getCustomerOrders(req, res, next) {
    try {
      const order = await Order.findAndCountAll({
        include: [
          {
            model: Customer,
            attributes: [],
          },
        ],
      });
      return res.status(200).json(order);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with order summary
   * @memberof ShoppingCartController
   */
  static async getOrderSummary(req, res, next) {
    const { order_id } = req.params;
    try {
      console.log(Order)
      const order = await Order.findByPk(order_id);
      if (order) {
        return res.status(200).json(order);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `order with id ${order_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getOrderShortDetails(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    try {
      const order = await Order.findByPk(order_id);
      if (order) {
        return res.status(200).json(order);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `order with id ${order_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async processStripePayment(req, res, next) {
   // waitted
   res.json({message:"wait for process!"});
  }
}

export default ShoppingCartController;
