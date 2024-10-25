import { TJWTPayload } from "../types/types";
import { GenrateTokenJWT } from "./GenrateTokens";
import { serialize } from "cookie";





export function SetGenrateCookie(jwtPayload: TJWTPayload): string {

    const token = GenrateTokenJWT(jwtPayload)

    const cookie =  serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.Node === "production",
        sameSite: 'strict',
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dayes expire
  
      })
      
      return cookie
}

