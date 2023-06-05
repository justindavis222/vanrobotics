import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "../store";
import { getLearners, getLearner, getClassBatch } from "../store/slices/roster";

const Welcome = () => {
  const [learnerSearchId, setLearnerSearchId] = useState("");
  const [classBatchSearchId, setClassBatchSearchId] = useState("");
  const dispatch = useDispatch();
  const { totalLearners, learner, classbatch } = useSelector(
    (state) => state.roster
  );

  useEffect(() => {
    dispatch(getLearners());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getClassBatch(classBatchSearchId));
  }, [dispatch, classBatchSearchId]);

  useEffect(() => {
    dispatch(getLearner(learnerSearchId));
  }, [dispatch, learnerSearchId]);

  const handleClassBatchSearch = (e) => {
    setClassBatchSearchId(e.target.value);
  };

  const handleLearnerSearch = (e) => {
    setLearnerSearchId(e.target.value);
  };

  const renderClassBatchCard = () => {
    if (classbatch === null) return null;

    return (
      <Card>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            This is a ClassBatch {classbatch.id} Card
          </Typography>
          <Typography>
            <Button href={`/classbatch/${classbatch.id}`}>
              {classbatch.name}
            </Button>
          </Typography>
          <Typography></Typography>
        </CardContent>
      </Card>
    );
  };

  const renderLearnerCard = () => {
    if (learner === null) return null;

    return (
      <Card>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            This is a Learner {learner.id} Card
          </Typography>
          <Typography>
            {learner.first_name + " " + learner.last_name}
          </Typography>
          <Typography>{learner.grade4}</Typography>
        </CardContent>
      </Card>
    );
  };

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
            Welcome
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Total Learners: {totalLearners}
          </Typography>
          <Grid container spacing={2} pt={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  id="outlined-search"
                  label="Search By ClassBatch ID"
                  onChange={handleClassBatchSearch}
                  type="number"
                />
              </FormControl>
              {renderClassBatchCard()}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  id="outlined-search"
                  label="Search By Learner ID"
                  onChange={handleLearnerSearch}
                  type="number"
                />
              </FormControl>
              {renderLearnerCard()}
            </Grid>
          </Grid>
          <Grid container spacing={2} pt={5} justifyContent="center">
            <Grid item>
              <Button href="/classbatches" variant="outlined">
                View ClassBatches
              </Button>
            </Grid>
            <Grid item>
              <Button href="/learners" variant="outlined">
                View All Learners
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default Welcome;
