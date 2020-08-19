import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Modal from "@material-ui/core/Modal"
import CardMedia from "@material-ui/core/CardMedia"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"

function MovieModal(props) {
  const [modalStyle] = useState(getModalStyle)

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    }
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: "65%",
      backgroundColor: theme.palette.background.paper,
      border: "hidden",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    media: {
      height: 400,
      display: 'block',
      margin: 'auto'
    }
  }))

  const classes = useStyles()

  return (
    <Modal
      open={true}
      onClose={() => {
        props.onClose()
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{props.movieDetail.Title}</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
          <CardMedia
              className={classes.media}
              image={props.movieDetail.Poster}
              title={props.movieDetail.Title}
            />
          </Grid>
          <Grid item xs={6}>
          <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Genre</TableCell>
                      <TableCell align="right">Director</TableCell>
                      <TableCell align="right">Actors</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={0}>
                      <TableCell align="right">
                        {props.movieDetail.Genre}
                      </TableCell>
                      <TableCell align="right">
                        {props.movieDetail.Director}
                      </TableCell>
                      <TableCell align="right">
                        {props.movieDetail.Actors}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <br/>
              <Typography gutterBottom variant="h6" component="h3">Plot</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.movieDetail.Plot}
              </Typography>
              <hr />
              <br/>
              <Typography gutterBottom variant="h5" component="h2">IMDB : {props.movieDetail.imdbRating}</Typography>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

export default MovieModal
