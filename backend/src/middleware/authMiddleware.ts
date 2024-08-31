import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import User from "models/userModels";
import ExpressError from "utils/ExpressError";
import wrapAsync from "utils/wrapAsync";

interface JwtPayload {
    userId: string
}

const protect = wrapAsync(async (req: Request, res, next) => {
  let token;

  token = req.cookies.jwtToken;
  //   token = req.header['authorisation'].split(' ')[1]

  if (token) {
    if (!process.env.JWT_SECRET_KEY) {
      return next(new ExpressError(500, "Token value is undefined"));
    }

    try {
      const decode = Jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

      if (!decode.userId) {
        return next(new ExpressError(401, "Invalid token: userId not found"));
      }

      const user = await User.findById(decode.userId).select("-password");

      if (!user) {
        return next(new ExpressError(404, "User not found"));
      }

      req.user = user;

      next();
    } catch (error) {
      return next(new ExpressError(401, "Invalid token"));
    }
  } else {
    return next(new ExpressError(401, "No token provided"));
  }
});


const isStudent = (req: Request, res: Response, next: NextFunction) => {
    const isStudent = req.user?.accountType === 'student'
    if(isStudent) {
        next()
    } else {
        next(new ExpressError(401, 'Not authorized, as Student'))
    }
};


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = req.user?.isAdmin
    if(req.user && isAdmin) {
        next()
    } else {
        next(new ExpressError(401, 'Not authorized, as Admin'))
    }
};


const isInstructor = (req: Request, res: Response, next: NextFunction) => {
    const isInstructor = req.user?.accountType === 'instructor'
    if(isInstructor) {
        next()
    } else {
        next(new ExpressError(401, 'Not authorized, as Instructor'))
    }
};

export { protect, isStudent, isAdmin, isInstructor };