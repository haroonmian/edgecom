import React, {  useState } from "react";
import styled from "@emotion/styled";
import { styled as styledMUI } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// component
import DataTable from "components/Table/DataTable";
// mui-imports
import CustomPagination from "components/Table/CustomPagination";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// typos
import { ArticleType } from "../../global.types";
import { Route as ArticleRoute } from "utilities/Routes";
import { useStore } from "store";
import { setArticles } from "store/actions";
import CustomButton from "components/Button";

const Dashboard = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const articles = state.articles;

  const onMouseEnterRow = (event: any) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = () => {
    setHoveredRow(null);
  };

  const handleEditRow = (param: ArticleType | any) => {
    navigate(`${ArticleRoute.editArticle}/${param.id}`, {
      state: { data: param.row },
    });
  };

  const handleDeleteRow = (param: any) => {
    const filtered = articles.filter((item) => item?.id !== param.row.id);
    dispatch(setArticles(filtered));
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 100,
      cellClassName: "cellStyle",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "author",
      headerName: "Author",
      type: "string",
      width: 250,
      cellClassName: "cellStyle",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      type: "string",
      width: 120,
      cellClassName: "cellStyle",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 128,

      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => handleEditRow(params)}>
                <StyledEditIcon />
              </Button>
              <Button onClick={() => handleDeleteRow(params)}>
                <StyleDeleteIcon />
              </Button>
            </Box>
          );
        } else return null;
      },
    },
  ];

  return (
    <DashboardContainer>
      <ButtonContainer>
        <Heading>Index</Heading>
        <CustomButton
          width="140px"
          height="45px"
          label="Add New"
          type="button"
          border="1px solid darkBlue"
          bgColor="white"
          color="darkBlue"
          onClickHAndler={() => navigate(ArticleRoute.addNewItem)}
        />
      </ButtonContainer>
      <DataTable
        initialState={{ pinnedColumns: { right: ["actions"] } }}
        columns={columns}
        rows={articles}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          row: {
            onMouseEnter: onMouseEnterRow,
            onMouseLeave: onMouseLeaveRow,
          },
        }}
      />
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  width: 600px;
  maxwidth: 500px;
  margin: 0 auto;
`;

const Heading = styled.div`
  font-size: 36px;
  font-weight: 700;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledEditIcon = styledMUI(EditIcon)`
border-radius: 50%;
padding:5px;
color:#4C50A5;
background-color: #DADBF2;
`;

const StyleDeleteIcon = styledMUI(DeleteIcon)`
border-radius: 50%;
padding:5px;
color:#EA8F7B;
background-color: #FDD9CF;
`;
