import { Request } from "express";
import { IUser } from "models/userModels";

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
        file?: Multer.File; // For single file upload
      }
    }
};

export {};