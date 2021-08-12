import React, { useState } from "react";
import { TripForm } from "../../components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  editCard: {
    padding: theme.spacing(2),
  },
}));

const Trip = ({ trip, deleteTrip, editTrip }) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const defaultValues = {
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    comment: trip.comment,
  };
  const onEdit = (tripObject) => {
    setEditMode(false);
    editTrip(trip.id, tripObject);
  };
  if (editMode)
    return (
      <Grid item key={trip.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <div className={classes.editCard}>
            <TripForm submit={onEdit} defaultValues={defaultValues} />
            <Button
              size="small"
              color="primary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </Grid>
    );

  return (
    <Grid item key={trip.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={`https://source.unsplash.com/800x600/?${trip.destination},trip`}
          title={trip.destination}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {trip.destination}
          </Typography>
          <Typography component="div">
            <Box textAlign="left" m={1}>
              <small>User ID: {trip.createdBy}</small>
            </Box>
            <Box textAlign="left" m={1}>
              <small>From: {trip.startDate.split("T")[0]}</small>{" "}
              <small>To: {trip.endDate.split("T")[0]}</small>
            </Box>
            <Box textAlign="justify" m={1}>
              {trip.comment}
            </Box>
          </Typography>
        </CardContent>
        <CardActions>
          {" "}
          <Button
            size="small"
            color="primary"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => deleteTrip(trip.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
    // <li>
    //   <p>
    //     Trip to <strong>{trip.destination}</strong>
    //   </p>
    //   <p>
    //     <small>Start Date: {trip.startDate}</small> -{" "}
    //     <small>End Date: {trip.endDate}</small>
    //   </p>
    //   <p>
    //     <small>User ID: {trip.createdBy}</small>
    //   </p>
    //   <p>
    //     <small>Comment: "{trip.comment}"</small>
    //   </p>
    //   <div>
    //     <button onClick={() => setEditMode(true)}>Edit</button>
    //     <button onClick={() => deleteTrip(trip.id)}>Delete</button>
    //   </div>
    //   <hr />
    // </li>
  );
};

export default Trip;
