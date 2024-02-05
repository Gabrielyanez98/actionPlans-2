/* import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  
  const errors: ValidationError[] = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({ mensaje: errors[0].msg });
  }

 return next();
};

export default validarCampos; */