import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled as styledMUI } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Route } from "../utilities/Routes";
import CustomButton from "components/Button";
import Input from "components/Input";
import { useStore } from "store";
import { setArticles } from "store/actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const EditArticle = () => {
  const location = useLocation();
  const [updatedArticles, setUpdatedArticles] = useState<any>({});
  const navigate = useNavigate();
  const stateData = location?.state?.data;
  useEffect(() => {
    setUpdatedArticles({ ...stateData });
  }, [stateData]);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { state, dispatch } = useStore();

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setUpdatedArticles((state: any) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const submitForm = (e: any) => {
    e.preventDefault();
    const newArr = state.articles.map((object) => {
      if ((object: { id: any }) => object.id === stateData.id) {
        // 👇️ change value of name property
        return {
          ...object,
          title: updatedArticles.title,
          author: updatedArticles.author,
          createdAt: updatedArticles.createdAt,
        };
      }
      return object;
    });

    updatedArticles.id
      ? dispatch(setArticles(newArr))
      : dispatch(
          setArticles([
            ...state.articles,
            {
              id: Math.floor(Math.random() * 1000).toString(),
              title: updatedArticles.title,
              author: updatedArticles.author,
              createdAt: format(new Date(), "MM/dd/yyyy"),
            },
          ])
        );
    navigate(Route.dashboard);
  };
  const btnValue = updatedArticles.id ? "Update" : "Create";
  const headerText = updatedArticles.id ? "Update Item" : "New Item";

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <PageContainer>
      <Grid container spacing={1.5} mt={1}>
        <Grid item xs={8}>
          <FormContainer>
            <Heading>{headerText} </Heading>
            <form onSubmit={submitForm} noValidate style={{ width: "100%" }}>
              <Input
                inputType="text"
                name="title"
                id="title"
                label="Title"
                placeholder="Type Title"
                width={"100%"}
                value={updatedArticles?.title || ""}
                onChange={(e: any) => onChangeHandler(e)}
              />
              <Input
                inputType="text"
                name="author"
                id="author"
                width={"100%"}
                label="Content"
                value={updatedArticles?.author || ""}
                onChange={(e: any) => onChangeHandler(e)}
                placeholder="Type Content"
              />
              <Grid container mt={1}>
                <LabelGrid item xs={3.9} pr={1}>
                  <label htmlFor="Tags">Tags :</label>
                </LabelGrid>
                <Grid item xs={7.8} mr={1}>
                  <FormControl sx={{ m: 1, width: 295 }}>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                    >
                      {tags.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <CustomButton
                width="140px"
                height="55px"
                label={btnValue}
                type="submit"
                disable={
                  updatedArticles?.title && updatedArticles?.author
                    ? false
                    : true
                }
              />
            </form>
          </FormContainer>
        </Grid>
        <IndexGrid item xs={4}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <LinkText>Back to index</LinkText>
          </Link>
        </IndexGrid>
      </Grid>
    </PageContainer>
  );
};

export default EditArticle;

const PageContainer = styledMUI(Box)`
    margin: auto 0;   
`;

const FormContainer = styledMUI(Box)`
width: 450px;
height: 100vh;
margin:  150px auto auto 150px;
`;

const Heading = styledMUI(Typography)`
font-size: 40px;
font-weight: 800;
margin-bottom: 10px;
float: left;

span {
  color:red
}
`;

const LabelGrid = styled(Grid)`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const IndexGrid = styled(Grid)`
  margin-top: 160px;
`;

const LinkText = styled.span`
  color: #414bb2;
  border-bottom: 1px solid #a0a5d9;
  padding-bottom: 3px;
  cursor: pointer;
  font-weight: 600;
`;
