import { NextRequest } from "next/server";
import { TJWTPayload } from "../types/types";
import jwt from "jsonwebtoken";

// ______ Verify Token From API End Point ________ //
export function VerifyToken(request: NextRequest): TJWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    if (!token) return null;

    const privateKey = process.env.JWT_SECRET as string;

    const userPayload = jwt.verify(token, privateKey) as TJWTPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}



// ______ Verify Token For Page ________ //

export function VerifyTokenForPage(token: string): TJWTPayload | null {
  try {
      const privateKey = process.env.JWT_SECRET as string;
      const userPayload = jwt.verify(token, privateKey) as TJWTPayload;
      if(!userPayload) return null;

      return userPayload;
  } catch (error) {
      return null;
  }
}

