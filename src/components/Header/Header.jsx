import React from 'react'
import { AppBar, Grid, Toolbar } from '@material-ui/core';

export default function Header() {
    return (
        <>
           <AppBar position="static">
        <Toolbar>
         <Grid container>
             <Grid sm={4}></Grid>
         </Grid>
        </Toolbar>
      </AppBar> 
        </>
    )
}
