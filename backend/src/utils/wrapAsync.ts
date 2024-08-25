import { NextFunction, Request, Response } from "express";

type AsyncHandler<T extends Request> = ( req: T, res: Response, next: NextFunction ) => Promise<any>;

const wrapAsync = <T extends Request>(fn: AsyncHandler<T>) => {
    return (req: T, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};  

export default wrapAsync;


// type AsyncHandler = ( req: Request, res: Response, next: NextFunction ) => Promise<any>;

// const wrapAsync = (fn: AsyncHandler) => 
//     (req: Request, res: Response, next: NextFunction) => 
//         fn(req, res, next).catch(next);