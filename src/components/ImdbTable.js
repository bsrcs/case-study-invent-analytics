import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import SearchBar from "./SearchBar"
import Table from "@material-ui/core/Table"
import TablePagination from "@material-ui/core/TablePagination"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Axios from "axios"
import * as ApiDetails from "./utils/ApiDetails"
import MovieDetailPopUp from "./MovieDetailPopup"

function ImdbTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [tableData, setTableData] = useState([])
  const [showDialogComponent, setDialogOpen] = useState(false)
  const [selectedMovieDetail, setSelectedMovieDetail] = useState({})

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })
  const classes = useStyles()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  async function getSearchDataForTableFromApi(searchTitle) {
    try {
      searchTitle = ApiDetails.BY_SEARCH.replace(
        "<TITLE_TO_SEARCH>",
        searchTitle
      )
      var url =
        ApiDetails.BASEURL +
        ApiDetails.APIKEY +
        ApiDetails.PARAMETER_SEPERATOR +
        searchTitle
      console.log("url: " + url)
      const response = await Axios.get(url)
      console.log("Response from API : " + response)
      if (response.data.Response === "True") {
        setTableData(response.data.Search)
        console.log("The movie data successfully fetched.")
      } else {
        setTableData([])
        console.log("No movie found!")
      }
    } catch (err) {
      console.log("There was an error : " + err)
    }
  }
  // searchInApi called by SearchBar component
  function searchInApi(searchText) {
    console.log("Searched for : " + searchText)
    getSearchDataForTableFromApi(searchText)
  }

  // after rendering first time
  useEffect(() => {
    // default search
    getSearchDataForTableFromApi("pokemon")
  }, [])

  //when user clicks on the movie id
  async function handleClick(imdbID) {
    console.log("user clicked on : " + imdbID)
    //call the api and set the data in 'selectedMovieDetail' state
    try {
      var url =
        ApiDetails.BASEURL +
        ApiDetails.APIKEY +
        ApiDetails.PARAMETER_SEPERATOR +
        ApiDetails.BY_ID.replace("<ID_TO_SEARCH>", imdbID);
        console.log(url);
      const response = await Axios.get(url);
      console.log(response.data);
      setSelectedMovieDetail(response.data);
    } catch (err) {
      setSelectedMovieDetail({});
      console.log("Error occurred!!!"+ err);
    }
    //open the dialog
    setDialogOpen(true);
  }

  // closeDialog called by "MovieDetailPopUp" component
  function closeDialog() {
    setDialogOpen(false)
  }

  return (
    <>
      {showDialogComponent && (
        <MovieDetailPopUp
          onClose={closeDialog}
          movieDetail={selectedMovieDetail}
        />
      )}
      <SearchBar onSearch={searchInApi} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">IMDB</TableCell>
              <TableCell>Movie Title</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((tableItem) => (
              <TableRow key={tableItem.imdbID}>
                <TableCell
                  onClick={() => handleClick(tableItem.imdbID)}
                  align="right"
                >
                  <p style={{ color: "blue", textDecoration: "underline" }}>
                    {tableItem.imdbID}
                  </p>
                </TableCell>
                <TableCell component="th" scope="row">
                  {tableItem.Title}
                </TableCell>
                <TableCell align="right">{tableItem.Year}</TableCell>
                <TableCell align="right">{tableItem.Type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ImdbTable
