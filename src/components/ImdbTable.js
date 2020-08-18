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
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [tableData, setTableData] = useState([])
  const [showDialogComponent, setDialogOpen] = useState(false)
  const [selectedMovieDetail, setSelectedMovieDetail] = useState({})
  const [totalResults, setTotalResults] = useState(0);
  const [searchText, setSearchText] = useState("pokemon");

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

  const classes = useStyles()

  const handleChangePage = (event, newPageNumber) => {
    console.log("current page number: "+newPageNumber);
    //update page number
    setPage(newPageNumber);
    getSearchDataForTableFromApi(searchText,page);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  async function getSearchDataForTableFromApi(searchTitle,pageNum) {
    try {
      var searchTitleUrl = ApiDetails.BY_SEARCH.replace("<TITLE_TO_SEARCH>",encodeURI(searchTitle));
      //use 'page' state variable to call api with a specific page number
      var pageToShowUrl = ApiDetails.PAGE.replace("<PAGE_TO_SHOW>", pageNum+1)

      var url =
        ApiDetails.BASEURL +
        ApiDetails.APIKEY +
        ApiDetails.PARAMETER_SEPERATOR +
        searchTitleUrl +
        ApiDetails.PARAMETER_SEPERATOR +
        pageToShowUrl
      console.log("url: " + url)
      const response = await Axios.get(url)
      //console.log("api response : "+JSON.stringify(response));
      if (response.data.Response === "True") {
        // set total results for pagination
        setTotalResults(parseInt(response.data.totalResults));
        var responseList=response.data.Search;

        // filter duplicate responses from api
        const filteredArr = responseList.reduce((acc, current) => {
          const x = acc.find(item => item.imdbID === current.imdbID);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        
        // set data in the table
        setTableData(filteredArr)
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
    setPage(0);
    // store the current seach text for later use
    setSearchText(searchText);
    getSearchDataForTableFromApi(searchText,page)
  }

  // after rendering first time
  useEffect(() => {
    // default search
    getSearchDataForTableFromApi(searchText,page)
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
        ApiDetails.BY_ID.replace("<ID_TO_SEARCH>", imdbID)
      console.log(url)
      const response = await Axios.get(url)
      //console.log(response.data)
      setSelectedMovieDetail(response.data)
    } catch (err) {
      setSelectedMovieDetail({})
      console.log("Error occurred! " + err)
    }
    //open the dialog
    setDialogOpen(true)
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
        rowsPerPageOptions={[10]}
        component="div"
        count={totalResults}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ImdbTable
