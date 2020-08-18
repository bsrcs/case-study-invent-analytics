import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function MovieDetailPopUp(props) {
  return (
    <Dialog
    open={true}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">{"Movie Details"}</DialogTitle>
    <DialogContent>
       <img alt="poster" src={props.movieDetail.Poster}/> 
       <p>Title: {props.movieDetail.Title}</p> 
       <p>Runtime: {props.movieDetail.Runtime}</p> 
       <p>Genre: {props.movieDetail.Genre}</p> 
       <p>Director: {props.movieDetail.Director}</p> 
       <p>Actors: {props.movieDetail.Actors}</p> 
       <p>imdbRating: {props.movieDetail.imdbRating}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>{props.onClose()}} color="primary">
        Okay
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default MovieDetailPopUp
