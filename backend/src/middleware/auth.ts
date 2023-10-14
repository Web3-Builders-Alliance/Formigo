import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";
import { log } from "console";

export interface IUserRequest extends Request {
  user?: any; // You can replace 'any' with a more specific type for your user data
}

function authenticateToken(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(403).send("A token is required for authentication");
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;
    return next(); // Call next() to proceed with the next middleware or route handler.
  } catch (err) {
    log(err)
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("Invalid Token");
    } else if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired");
    } else {
      return res.status(500).send("Internal Server Error"); 
    }
  }
}

export default authenticateToken;
