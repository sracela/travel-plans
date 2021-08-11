import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { Nav, Header } from "../../components";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: "100vh",
    overflow: "auto",
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Layout({ children, isLoggedIn, onLogout }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Nav
        open={open}
        handleDrawerClose={handleDrawerClose}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12}> */}
              {children}
            {/* </Grid> */}
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
