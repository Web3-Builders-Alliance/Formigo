import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeJwt: any = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    return decoded;
  } catch (err) {
    return err;
  }
};
