import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Copyright } from "../../components";

import { Nav, Header } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: 'nowrap'
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
    <Grid container className={classes.root}>
      {/* <CssBaseline /> */}
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
              {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </Grid>
  );
}
