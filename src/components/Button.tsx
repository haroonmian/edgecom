import React, { FC, memo } from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  disable?: boolean;
  width?: string;
  height?: string;
  border?:string;
  bgColor?: string;
  color? : string;
  onClickHAndler? : React.MouseEventHandler<HTMLButtonElement> | undefined
}
export const CustomButton: FC<ButtonProps> = memo(
  ({ label, type, disable, width, height,border , bgColor,color, onClickHAndler}) => {
    return (
      <div>
        <button
          disabled={disable}
          type={type}
          style={{
            width: width,
            height: height,
            backgroundColor: disable ? "#A0A5D9" : bgColor ? bgColor : "#414BB2",
            color: disable ? "#CBCDEA" : color ? color : "white",
            fontSize: "20px",
            marginTop: "10px",
            border: border ? border : 'none'
          }}
          onClick={onClickHAndler}
        >
          {label}
        </button>
      </div>
    );
  }
);

export default CustomButton;
