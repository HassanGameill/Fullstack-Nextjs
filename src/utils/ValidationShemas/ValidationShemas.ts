import { z } from "zod";

// Make Zod To make Validateion


// Create Articale Schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string ",
    })
    .min(2, {message: "title should be at least 2 characters long"})
    .max(200,  {message: "title should be least than 200 characters long"}),
  description: z.string().min(2).max(200),
});




// Create User Register Schema 
export const registerSchema = z.object({
    username: z.string().min(2).max(100), //.optional(),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),

})




// Login Schema
export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),

})


// Create Comment Schema
export const CreateCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),

})





// Create User Upade User Schema 
export const updateUserSchema = z.object({
  username: z.string().min(2).max(100).optional(), //.optional(),
  email: z.string().min(3).max(200).email().optional(),
  password: z.string().min(6).optional(),

})

