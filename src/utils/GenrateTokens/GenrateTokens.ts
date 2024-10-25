import jwt from "jsonwebtoken";
import { TJWTPayload } from "../types/types";

export function GenrateTokenJWT(jwtPayload: TJWTPayload): string {
    // Genrate Token with JWT Token
    // const jwtPayload = {
    //     id: user.id,
    //     isAdmin: user.isAdmin,
    //     username: user.username,
    //   };


      const privateKey = process.env.JWT_SECRET as string
  
      const token = jwt.sign(jwtPayload, privateKey , {expiresIn: "30d"});

      return token;

}

