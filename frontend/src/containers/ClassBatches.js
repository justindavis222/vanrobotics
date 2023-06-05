import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "../store";
import { getClassBatches } from "../store/slices/roster";

const columns = [
  { id: "id", label: "id", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "instructor", label: "Instructor", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

const ClassBatches = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoading, classbatches } = useSelector((state) => state.roster);

  useEffect(() => {
    dispatch(getClassBatches());
  }, [dispatch]);

  const handleDetailClassBatch = (idx) => {
    navigator(`/classbatch/${idx}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            ClassBatches
          </Typography>
          <Button href="/" variant="outlined">
            home
          </Button>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classbatches.length === 0 && "No results found..."}
                  {classbatches.length > 0 &&
                    classbatches.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "action" ? (
                                  <Button
                                    onClick={() =>
                                      handleDetailClassBatch(row.id)
                                    }
                                    variant="outlined"
                                  >
                                    Detail
                                  </Button>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </main>
  );
};

export default ClassBatches;
