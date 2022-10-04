import React, { FC, memo, useState } from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface IInputProps {
  errorState?: boolean;
  defaultValue?: string;
  inputType?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: any;
  className?: string;
  width?: string;
  label?: string;
  validationError?: string;
  placeholder?: string;
}

const Input: FC<IInputProps> = memo(
  ({
    errorState,
    defaultValue,
    inputType,
    name,
    id,
    value,
    onChange,
    className,
    width,
    label,
    validationError,
    placeholder,
  }) => {
    const [passwordType, setPasswordType] = useState(inputType);
    const togglePassword = () => {
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    };

    return (
      <Grid container spacing={1.5} mt={1}>
        <LabelGrid item xs={4}>
          <label htmlFor={label}>{label} :</label>
        </LabelGrid>
        <Grid item xs={8}>
          <TextField
            error={errorState}
            id={id}
            defaultValue={defaultValue}
            type={passwordType}
            name={name}
            value={value}
            onInput={onChange}
            className={className}
            size="medium"
            placeholder={placeholder}
            sx={{ width: width }}
            InputProps={{
              endAdornment:
                inputType === "password" ? (
                  <InputAdornment
                    position="start"
                    classes={{ positionStart: "0px" }}
                  >
                    <IconButton onClick={togglePassword}>
                      {passwordType === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} sx={{ textAlign: "left" }}>
          {validationError}
        </Grid>
      </Grid>
    );
  }
);

export default Input;

const LabelGrid = styled(Grid)`
  display: flex;
  justify-content: right;
  align-items: center;
`;
