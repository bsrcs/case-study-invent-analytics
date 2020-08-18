import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

function MovieDetailPopUp(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 400,
    },
  })
  const classes = useStyles()

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
<DialogTitle id="alert-dialog-title">{props.movieDetail.Title} , IMDB {props.movieDetail.imdbRating}</DialogTitle>
      <DialogContent>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.movieDetail.Poster}
              title={props.movieDetail.Title}
            />
            <CardContent>
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
            </CardContent>
          </CardActionArea>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose()
          }}
          color="primary"
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MovieDetailPopUp
