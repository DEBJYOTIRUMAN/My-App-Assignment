import Joi from "joi";
import { Link, User } from "../models";
import JwtService from "../services/JwtService";
import mail from "../utility/SendEmail";
import CustomErrorHandler from "../services/CustomErrorHandler";

const authController = {
  async login(req, res, next) {
    // Check the email format is valid or not
    const emailSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = emailSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email } = req.body;
    //Check if the user is already in database
    let user;
    try {
      user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        // Create a new user
        try {
          user = await User.create({
            email,
          });
          // Create a access token for the user
          const access_token = JwtService.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
          mail(access_token, user.email);
          res.status(201).json(user);
        } catch (err) {
          return next(err);
        }
      } else {
        // Create a access token for the user
        const access_token = JwtService.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
        mail(access_token, user.email);
        res.status(201).json(user);
      }
    } catch (err) {
      return next(err);
    }
  },

  async checkValidLink(req, res, next) {
    let link;
    try {
      link = await Link.findOne({ access_token: req.params.id });
      // Check the link is exist or not
      if (!link) {
        return next(CustomErrorHandler.invalidLink());
      }
      // Check the link is invalid or not
      if (link.invalid) {
        return next(CustomErrorHandler.invalidLink());
      }

      try {
        const { _id, name, email } = JwtService.verify(req.params.id);
        try {
          await Link.findOneAndUpdate(
            { access_token: req.params.id },
            {
              invalid: true,
            },
            { new: true }
          );
          return res.status(201).json({ _id, name, email });
        } catch (err) {
          return next(err);
        }
      } catch (err) {
        return next(CustomErrorHandler.invalidLink());
      }
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },

  async updateUserName(req, res, next) {
    const validateSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { name } = req.body;
    let document;
    try {
      document = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name,
        },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
};

export default authController;
