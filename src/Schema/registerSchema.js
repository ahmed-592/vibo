import * as zod from 'zod'

export const schema = zod.object({
  name: zod.string().nonempty("Name is required")
        .min(3 , "Name must be at least 3 characters long")
        .max(20 , "Name must be no more than 20 characters long"),
  email: zod.string().nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invaild email"),
       
  password: zod.string().nonempty("Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invaild password"),
        
  rePassword: zod.string().nonempty("Confirm password is required"),

  dateOfBirth: zod.coerce.date("Date is required")
              .refine((value) => {
                const diff = new Date().getFullYear() - value.getFullYear();
                return diff >= 18;
              } , "Age most be greater than 18"),

  gender: zod.string().nonempty("Gender is required"),
}).refine((date) => date.password === date.rePassword , {path:["rePassword"] , message:"Password and confirm password dont match"});
