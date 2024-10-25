
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



/**
 *
 * @method  GET
 * @route    ~/api/user/Logout
 * @desc     Login User Logout
 * @access   public
 */


export function GET(register: NextRequest) {
  try {
    cookies().delete("jwtToken");

    return NextResponse.json({ message: "Logout" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}
