"use client";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import MDeditor from '@uiw/react-md-editor';
import { Button } from "./ui/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validate";
import z from "zod";
import {showToast} from "nextjs-toast-notify"
import { Result } from "postcss";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
const StartupForm = () => {
const router = useRouter();
    const [errors,setErrors] = useState<Record<string,string>>({});
  const [pitch ,setPitch]  = useState("");
   const handleFormSubmit = async (prevState:any,formData:FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

     await formSchema.parseAsync(formValues);
    // console.log(result);
      const result = await createPitch(prevState, formData, pitch);
    console.log(formValues);
    console.log('hello',result);
    if(result.status === "Success") {
       showToast.success("Startup Has Been Created Successfully", {
    duration: 4000,
    progress: false,
    position: "top-center",
    transition: "swingInverted",
    icon: '',
    sound: true,
  });
router.push(`/startup/${result._id}`)
    }
    return result;
    } catch (error) {
    if(error instanceof z.ZodError){
      const fieldErrors = error.flatten().fieldErrors;
      setErrors(fieldErrors as unknown as Record<string,string>);
      showToast.error("Please check your inputs and try again", {
    duration: 4000,
    progress: false,
    position: "top-center",
    transition: "swingInverted",
    icon: '',
    sound: true,
  });
      return {...prevState,error:"Validation Failed",status : "Error"}
    }
     showToast.error("This Error Should Not Expected", {
    duration: 4000,
    progress: false,
    position: "top-center",
    transition: "swingInverted",
    icon: '',
    sound: true,
  });
    return {...prevState,
      error : "An unexpected error has ocuured",
      
      };   
    }
   }
 
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  return (
   <form  action = {formAction} className='startup-form' >
    <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
      
  <Input id = "title" name = "title" className = "startup-form_input" required placeholder = "startup title"/>
   {errors.title && <p className="startup-form_error" >{errors.title}</p>}
    </div>
     <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
      
  <Textarea id = "description" name = "description" className = "startup-form_textarea" required placeholder = "startup description"/>
   {errors.description && <p className="startup-form_error" >{errors.description}</p>}
    </div>
     <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
      
  <Input id = "category" name = "category" className = "startup-form_category" required placeholder = "startup category(e.g. Tech Health Education)"/>
   {errors.category && <p className="startup-form_error" >{errors.category}</p>}
    </div>
     <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
      
  <Input id = "link" name = "link" className = "startup-form_input" required placeholder = " Startup Image Url"/>
   {errors.link && <p className="startup-form_error" >{errors.link}</p>}
    </div>
      <div data-color-mode = 'light'>
        <label htmlFor="link" className='startup-form_label'>Pitch</label>
      <MDeditor value = {pitch} onChange = {(value)=>{setPitch(value as string)}} id = 'pitch' height={400}  style = {{borderRadius : 20,overflow : 'hidden',width:750}} 
        textareaProps={{
            placeholder : "Briefly describe your idea and what problem it solves"
        }}
        previewOptions={{disallowedElements : ['style']}}
        />
   {errors.pitch && <p className="startup-form_error" >{errors.pitch}</p>}
    </div>
    <Button type="submit" className="startup-form_btn w-[750px] text-white" disabled = {isPending}>
        {isPending?"Submitting .." : "Submit Your Pitch"}
        <Send className = 'size-6 ml-2' />
        </Button>
   </form>
  )
}

export default StartupForm