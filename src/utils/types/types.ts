

import {Article, Comment, User} from "@prisma/client"


export type TJWTPayload = {
    id: number;
    isAdmin: boolean;
    username: string
}




export type CommentWithUser = Comment & {user: User}


export type SingleArticle = Article & {comments: CommentWithUser[]}



