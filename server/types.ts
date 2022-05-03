export interface NextFunction {
    (err?: any): void;
}

export interface RequestHandler {
  (req: Request, res: Response, next: NextFunction): any;
}

// export interface ErrorRequestHandler {
//   (err: any, req: Request, res: Response, next: NextFunction): any;
// }

export interface MiddlewareFunction {
    (req: Request, res: Response, next: NextFunction): void;
  }
