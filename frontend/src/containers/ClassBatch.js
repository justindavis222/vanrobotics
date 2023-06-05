import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Typography,
  Box,
  Container,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "../store";
import { getClassBatch, updateClassBatch } from "../store/slices/roster";

const learnColumns = [
  { id: "id", label: "id", align: "center" },
  { id: "first_name", label: "First Name", align: "center" },
  { id: "last_name", label: "Last Name", align: "center" },
  { id: "grade", label: "Grade", align: "center" },
];

const LearnColumn = ({ column }) => (
  <TableCell align={column.align} style={{ minWidth: column.minWidth }}>
    {column.label}
  </TableCell>
);

const LearnRow = ({ learner, learnColumns }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={learner.code}>
    {learnColumns.map((column) => (
      <TableCell key={column.id} align={column.align}>
        {learner[column.id]}
      </TableCell>
    ))}
  </TableRow>
);

const ClassBatch = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(true);
  const { isLoading, classbatch } = useSelector((state) => state.roster);
  const { classbatchId } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getClassBatch(classbatchId));
  }, [dispatch, classbatchId]);

  useEffect(() => {
    if (classbatch) setName(classbatch.name);
  }, [classbatch]);

  const handleChangeClassName = (e) => {
    setName(e.target.value);
  };

  const handleEdit = () => {
    if (isEdit) setIsEdit(false);
    else {
      dispatch(updateClassBatch(classbatchId, name));
      setIsEdit(true);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <main>
      <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
        <Container>
          <Button href="/" variant="outlined">
            home
          </Button>
          <Grid container spacing={2} pt={5}>
            {classbatch !== null ? (
              <>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    pt={5}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={8}>
                      <FormControl fullWidth variant="standard">
                        <TextField
                          id="outlined-search"
                          label="Class Name"
                          disabled={isEdit}
                          value={name}
                          onChange={(e) => handleChangeClassName(e)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth variant="standard">
                        <Button onClick={handleEdit} variant="outlined">
                          {isEdit ? "Edit" : "Update"}
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard">
                    <TextField
                      id="outlined-search"
                      label="Instructor"
                      disabled={true}
                      value={classbatch.instructor}
                      onChange={(e) => handleChangeClassName(e)}
                    />
                  </FormControl>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Typography>No ClassBatch found with this id...</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography>Associated Learners</Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {learnColumns.map((column) => (
                          <LearnColumn key={column.id} column={column} />
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classbatch?.learners.length === 0 ? (
                        <Typography>No exists</Typography>
                      ) : (
                        classbatch?.learners.map((learner) => (
                          <LearnRow
                            key={learner.code}
                            learner={learner}
                            learnColumns={learnColumns}
                          />
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default ClassBatch;
