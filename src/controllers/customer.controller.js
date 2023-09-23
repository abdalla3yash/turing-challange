/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 * 
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 * 
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Customer, sequelize } from '../database/models';
var FacebookTokenStrategy = require('passport-facebook-token');
var passport = require('passport');
var bcrypt = require('bcrypt');

// to facebook login
passport.use(new FacebookTokenStrategy({
  clientID: "FACEBOOK_CLIENT_ID",
  clientSecret: "FACEBOOK_CLIENT_SECRET_KET",
  fbGraphVersion: 'v3.0'
    }, function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ facebookId: profile.id }, function (error, user) {
        return done(error, user);
      });
    }
));

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof CustomerController
   */
  static async create(req, res) {
    await Customer.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(customer => {
        res.json({ customer })
      }).catch(err => {
        res.send(err)
      });
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof CustomerController
   */
  static async login(req, res, next) {
    // implement function to login to user account
    Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(customer => {
      if (bcrypt.compareSync(req.body.password, customer.password)) {
        res.json({ customer })
      } else {
        res.send('email or password are not exists!')
      }
    }).catch(err => {
      res.send(err)
    })
  }


  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status facebook login
   * @memberof CustomerController
   */
  static async facebook(req, res, next) {
    module.exports = {
      facebook: function (req, res) {
        passport.authenticate('facebook-token', function (error, user, info) {
          // do stuff with user
          res.status(200).send(user);
          res.ok();
        })(req, res);
      }
    };
  }


  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    const { customer_id } = req;  // eslint-disable-line
    try {
      const customer = await Customer.findByPk(customer_id);
      return res.status(200).json({
        customer,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone    
    try {
      const customer = Customer.update({
        name: req.body.name,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone
      },
        {
          where: {
            email: req.body.email
          }
        }).then(() => {
          res.send(customer);
        });
    } catch (err) {
      res.json(err);
    }
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    try {
      const customer = Customer.update({
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code: req.body.postal_code,
        shipping_region_id: req.body.shipping_region_id
      },
        {
          where: {
            email: req.body.email
          }
        }).then(() => {
          res.send(customer);
        });
    } catch (err) {
      res.json(err);
    }
  }
  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    try {
      const customer = Customer.update({
        credit_card: req.body.credit_card,
      },
        {
          where: {
            email: req.body.email
          }
        }).then(() => {
          res.send(customer);
        });
    } catch (err) {
      res.json(err);
    }
  }
}

export default CustomerController;
