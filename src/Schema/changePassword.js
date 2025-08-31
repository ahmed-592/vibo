import * as zod from 'zod'

export const schema = zod.object({
    password: zod.string().nonempty("Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invaild passwordl"),
          newPassword: zod.string().nonempty("Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invaild passwordl")
})            