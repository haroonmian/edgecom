import { errors } from "./Interfaces";
import validator from 'validator'

export const validate = (values: { email: string; password: string; confirmPassword:string}) => {
    let errors: errors = {
        email: "",
        password: "",
        confirmPassword:""
    };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } 
    else if (validator.isStrongPassword(values.password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      // errors.password='Is Strong Password'
    } else {
      errors.password= 'Should Contain exapmle @a5A'
    }

   if (values.password !== values.confirmPassword) {
      errors.confirmPassword='Password Not Same'
    }
    
    return errors;
  };