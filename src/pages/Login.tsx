import { Box, Typography } from "@mui/material";
import React, { FC, memo, useState } from "react";
import { styled as styledMUI } from "@mui/material/styles";
import styled from '@emotion/styled';
import CustomButton from "../components/Button";
import Input from "../components/Input";
import { errors } from "../utilities/Interfaces";
import { validate } from "../utilities/Validations";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';  

const Login: FC<any> = memo(() => {
  const intialValues = { email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState<errors | undefined>({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    !formErrors?.email && !formErrors?.password && navigate('/dashboard')
  };

  return (
    <PageContainer>
      <FormContainer >
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
          <Input
            inputType="email"
            name="email"
            id="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            width={"100%"}
            value={formValues.email}
            onChange={handleChange}
            errorState={formErrors?.email ? true : false}
            validationError={formErrors?.email && formErrors?.email}
          />
          <Input
            inputType="password"
            name="password"
            id="password"
            width={"100%"}
            label="Password"
            value={formValues.password}
            onChange={handleChange}
            validationError={formErrors?.password && formErrors?.password}
            errorState={formErrors?.password ? true : false}
            placeholder="*****"
          />
          <CustomButton
            width="100%"
            height="55px"
            label="Sign In"
            type="submit"
            disable={
              formValues?.email &&
              formValues?.password 
                ? false
                : true
            }
          />
        </form>
        <Typography pt={3}>
          Don't have an account? <Link to='/signup' style={{textDecoration:'none'}}><LinkText>Register</LinkText></Link>
        </Typography>
      </FormContainer>
    </PageContainer>
  );
});
export default Login;

const PageContainer = styledMUI(Box)`
    margin: auto;   
`;

const FormContainer = styledMUI(Box)`
width: 450px;
height: 100vh;
margin:  150px auto auto auto;
`;

const Heading = styledMUI(Typography)`
font-size: 40px;
font-weight: 800;
margin-bottom: 10px;
float: left;
`;

const LinkText = styled.span`
color: #414BB2;
border-bottom: 1px solid #A0A5D9;
padding-bottom: 3px;
cursor: pointer;
font-weight: 600;
`;
