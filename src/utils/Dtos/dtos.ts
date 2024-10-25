





export interface ICreateArticleDto {
    title: string;
    description: string;
}






export interface IUpdateArticleDto {
    title?: string;
    description?: string;
}



export interface IRegisterUserDto {
    username: string;
    email: string;
    password: string;
}



export interface ILoginUserDto {
    email: string;
    password: string;
}






export interface IUpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}




export interface ICreateCommentDto {
    text: string;
    articleId: number;
}






export interface IUpdateCommentDto {
    text: string;
}
