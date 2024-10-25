import { DOMAIN } from "@/utils/Constans/Constans";
import { Comment } from "@prisma/client";



// _______ Get all comments _______ 
export async function GetAllComments(token: string): Promise<Comment[]> {
    const res = await fetch(`${DOMAIN}/api/comments`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch comments");
    }

    return res.json();
}