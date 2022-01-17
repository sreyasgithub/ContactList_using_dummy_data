import React from "react";
import { Container, Grid, Box } from "@material-ui/core";

const Layout = (props) => {
  return (
    <Container>
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item container sm={8}>
          <Grid item xs={12}>
            <Box className="header">
              <Grid container alignItems="center">
                <Grid item xs={12} lg={5}>
                  <h4>{props.header}</h4>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <div>{props.search}</div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {props.children}
          </Grid>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
