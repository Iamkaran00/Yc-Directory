"use server";

import slugify from 'slugify'
import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { WriteClient } from './WriteClient';
export const createPitch = async (state:any,form:FormData,pitch:string) =>{
const session = await auth();

if(!session) return parseServerActionResponse({error:"Not signed In",status : "Error"});

const {title,description,category,link} = Object.fromEntries(
    Array.from(form).filter(([key]) => key != 'pitch') 
)
const slug = slugify(title as string,{lower : true,strict : true});
try {
    const startup =  {
        title,description,category,image:link,
        slug : {
            _type : slug,
            current : slug
        },
        author : {
            _type : 'reference',
            _ref : session?.id,
         },
         pitch
    };
    const result = await WriteClient.create({_type : 'startup',...startup});
    return parseServerActionResponse({
        ...result,
        error : '',
        status: 'Success',
    })
} catch (error) {
    console.log(error);
    return parseServerActionResponse({
        error : JSON.stringify(error),
        status : 'Error',
    })
}
};