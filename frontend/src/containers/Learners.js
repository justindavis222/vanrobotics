import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { getLearners, deleteLearner } from "../store/slices/roster";

const columns = [
  { id: "id", label: "id", align: "center" },
  { id: "first_name", label: "First Name", align: "center" },
  { id: "last_name", label: "Last Name", align: "center" },
  { id: "grade", label: "Grade", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

const DeleteConfirmationDialog = ({ open, onClose, onAgree }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Do you want to delete the learner?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Please click the "Agree" button if you agree, and please click the
        "Close" button if you do not agree.{" "}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Disagree</Button>
      <Button onClick={onAgree} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

const Learners = () => {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedLearnerId, setSelectedLearnerId] = useState(-1);
  const { isLoading, learners, totalLearners } = useSelector(
    (state) => state.roster
  );

  useEffect(() => {
    dispatch(getLearners());
  }, [dispatch]);

  const handleDeleteLearner = (learnerId) => {
    setOpenDeleteModal(true);
    setSelectedLearnerId(learnerId);
  };

  const handleCloseDialog = () => {
    setOpenDeleteModal(false);
  };

  const handleAgreeDialog = () => {
    dispatch(deleteLearner(selectedLearnerId));
    setOpenDeleteModal(false);
  };

  const renderTableRows = () => {
    if (learners.length === 0) {
      return <TableRow>No results found...</TableRow>;
    }

    return learners.map((row) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.id === "action" ? (
                <Button
                  onClick={() => handleDeleteLearner(row.id)}
                  variant="outlined"
                >
                  Delete
                </Button>
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <main>
      <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Learners
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Total Learners: {totalLearners}
          </Typography>
          <Button href="/" variant="outlined">
            Home
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
                <TableBody>{renderTableRows()}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
      <DeleteConfirmationDialog
        open={openDeleteModal}
        onClose={handleCloseDialog}
        onAgree={handleAgreeDialog}
      />
    </main>
  );
};

export default Learners;
