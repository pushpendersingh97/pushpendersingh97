import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ReactComponent as DescSvg}  from "./../../assets/Desc.svg"
import { ReactComponent as AscSvg}  from "./../../assets/Asc.svg"
import { ReactComponent as MixSvg}  from "./../../assets/Mix.svg"
import { TableData as data } from "./../dummyData";
import { useMediaQuery } from "@mui/material";
import SkeletonLoader from "../common/SkeletonLoader";

import InputGroup from "react-bootstrap/InputGroup";
import Search from "@mui/icons-material/Search";
import { Form } from "react-bootstrap";

function RowData(props) {
  const { row, isSmallScreen, isTablet, isDesktop } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { border: "none" } }}>
        <TableCell
          sx={{ border: "none", fontWeight: "700" }}
          component="th"
          scope="row"
          align="left"
        >
          {row.scriptName}
        </TableCell>
        <TableCell
          sx={{ border: "none", fontWeight: "700" }}
          component="th"
          scope="row"
          align="center"
          className={isSmallScreen ? "d-none" : ""}
        >
          {row.volMultiplier}
        </TableCell>
        <TableCell
          sx={{ border: "none", fontWeight: "700" }}
          component="th"
          scope="row"
          align="center"
          className={isSmallScreen || isTablet ? "d-none" : ""}
        >
          {row.ltp}
        </TableCell>
        <TableCell
          sx={{
            border: "none",
            color: row.signal.includes("BUY")
              ? "#0CC500"
              : row.signal.includes("SELL")
              ? "#FB3766"
              : "",
            fontWeight: "700",
          }}
          component="th"
          scope="row"
          align="center"
          className={isSmallScreen ? "d-none" : ""}
        >
          {row.percentChange}
        </TableCell>
        <TableCell
          sx={{ border: "none", fontWeight: "700" }}
          component="th"
          scope="row"
          align="center"
          className={isSmallScreen || isTablet || isDesktop ? "d-none" : ""}
        >
          {row.previousClosing}
        </TableCell>
        <TableCell
          sx={{ border: "none", fontWeight: "700" }}
          component="th"
          scope="row"
          align="center"
        >
          {row.signalGenerationTime}
        </TableCell>
        <TableCell
          sx={{ border: "none" }}
          component="th"
          scope="row"
          align="center"
        >
          <div
            style={{
              background: row.signal.includes("BUY")
                ? "#EAFDF6"
                : row.signal.includes("SELL")
                ? "#FFEBF0"
                : "",
              border: row.signal.includes("BUY")
                ? "2px solid #0CC500"
                : row.signal.includes("SELL")
                ? "2px solid #FB3766"
                : "",
              color: row.signal.includes("BUY")
                ? "#0CC500"
                : row.signal.includes("SELL")
                ? "#FB3766"
                : "",
            }}
            className="buyBtn"
          >
            {row.signal}
          </div>
        </TableCell>
        <TableCell sx={{ border: "none" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ border: "none" }}>
        <TableCell
          sx={{ border: "none" }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="border-bottom">
              {row.expandData.map((expandRow, idx) => (
                <div className="row" key={idx}>
                  <div className="col-12">
                    <div className="row">
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          className="table-card"
                          style={{ background: "#fbe2f3" }}
                        >
                          <ul>
                            <li>
                              <span className="listItems">
                                Ten Day High : {expandRow.tenDayHigh}
                              </span>
                            </li>
                            <li>
                              <span className="listItems">
                                Ten Day Low : {expandRow.tenDayLow}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          className="table-card"
                          style={{ background: "#d5f6ed" }}
                        >
                          <ul>
                            <li>
                              <span className="listItems">
                                Day High : {expandRow.dayHigh}
                              </span>
                            </li>
                            <li>
                              <span className="listItems">
                                Day Low : {expandRow.dayLow}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 "
                        style={{ textAlign: "center" }}
                      >
                        <div
                          className="table-card"
                          style={{ background: "#e0f3ff" }}
                        >
                          <ul>
                            <li>
                              <span className="listItems">
                                Todays Volume : {expandRow.todaysVol}
                              </span>
                            </li>
                            <li>
                              <span className="listItems">
                                Lot Size : {expandRow.lotSize}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          className="table-card"
                          style={{ background: "#e2dbf9" }}
                        >
                          <ul style={{ marginTop: "auto" }}>
                            <li className="breakevenLi">
                              <span className="listItems">
                                Breakeven : {expandRow.breakEven}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className={
                          isSmallScreen || isTablet
                            ? "col-12 col-md-6 col-lg-4 col-xl-3"
                            : "d-none"
                        }
                      >
                        <label className="theme-value">
                          LTP: <span className="theme-label">{row.ltp}</span>
                        </label>
                      </div>
                      <div
                        className={
                          isSmallScreen
                            ? "col-12 col-md-6 col-lg-4 col-xl-3"
                            : "d-none"
                        }
                      >
                        <label className="theme-value">
                          %Change:{" "}
                          <span
                            className="theme-label"
                            style={{
                              color: row.signal.includes("BUY")
                                ? "#0CC500"
                                : row.signal.includes("SELL")
                                ? "#FB3766"
                                : "",
                            }}
                          >
                            {row.percentChange}
                          </span>
                        </label>
                      </div>

                      <div
                        className={
                          isSmallScreen || isTablet || isDesktop
                            ? "col-12 col-md-6 col-lg-4 col-xl-3"
                            : "d-none"
                        }
                      >
                        <label className="theme-value">
                          Previous Closing:{" "}
                          <span className="theme-label">
                            {row.previousClosing}
                          </span>
                        </label>
                      </div>
                      <div
                        className={
                          isSmallScreen || isTablet || isDesktop
                            ? "col-12 col-md-6 col-lg-4 col-xl-3"
                            : "d-none"
                        }
                      >
                        <label className="theme-value">
                          Signal Generation Time:{" "}
                          <span className="theme-label">
                            {row.signalGenerationTime}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

RowData.propTypes = {
  row: PropTypes.shape({
    scriptName: PropTypes.string.isRequired,
    volMultiplier: PropTypes.number.isRequired,
    ltp: PropTypes.number.isRequired,
    percentChange: PropTypes.number.isRequired,
    previousClosing: PropTypes.number.isRequired,
    signalGenerationTime: PropTypes.string.isRequired,
    signal: PropTypes.string.isRequired,
    expandData: PropTypes.arrayOf(
      PropTypes.shape({
        tenDayHigh: PropTypes.number.isRequired,
        tenDayLow: PropTypes.number.isRequired,
        dayHigh: PropTypes.number.isRequired,
        dayLow: PropTypes.number.isRequired,
        todaysVol: PropTypes.number.isRequired,
        lotSize: PropTypes.number.isRequired,
        breakEven: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

function CollapsibleTable() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSort = (column) => {
    if (column === sortColumn) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection("none");
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.scriptName.toLowerCase().includes(searchTerm) ||
      user.signalGenerationTime.toLowerCase().includes(searchTerm) ||
      user.signal.toLowerCase().includes(searchTerm) ||
      user.volMultiplier.toString().includes(searchTerm) ||
      user.ltp.toString().includes(searchTerm) ||
      user.percentChange.toString().includes(searchTerm) ||
      user.previousClosing.toString().includes(searchTerm)
    );
  });

  // Custom sorting function
  const customSort = (a, b) => {
    if (sortColumn === "scriptName") {
      return sortDirection === "asc"
        ? a.scriptName.localeCompare(b.scriptName)
        : b.scriptName.localeCompare(a.scriptName);
    }

    if (sortColumn === "signalGenerationTime") {
      const parseTime = (timeString) => {
        const [hours, minutes, seconds] = timeString
          .toLowerCase()
          .split(":")
          .map((segment) => parseInt(segment));

        return hours * 3600 + minutes * 60 + seconds;
      };

      const aTimestamp = parseTime(a.signalGenerationTime);
      const bTimestamp = parseTime(b.signalGenerationTime);

      if (sortDirection === "asc") {
        return aTimestamp - bTimestamp;
      } else {
        return bTimestamp - aTimestamp;
      }
    }

    if (sortColumn === "signal") {
      return sortDirection === "asc"
        ? a.signal.localeCompare(b.signal)
        : b.signal.localeCompare(a.signal);
    }
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  };

  const sortedData = [...filteredData].sort(customSort);

  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(max-width: 1024px)");

  const header = [
    "scriptName",
    "volMultiplier",
    "ltp",
    "percentChange",
    "previousClosing",
    "signalGenerationTime",
    "signal",
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonLoader numColumns={1} />
      ) : (
        <TableContainer sx={{ padding: "2%" }} component={Paper}>
          <div>
            <h3>Table Name</h3>
          </div>
          <div className="card-search">
            <InputGroup className="table-search mb-3">
              <InputGroup.Text id="topGainer">
                <Search />
              </InputGroup.Text>

              <Form.Control
                type="text"
                placeholder="Search Top Gainers"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {header.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      cursor: "pointer",
                      borderTop: "2px solid #F5F7FA",
                      fontWeight: "600",
                      backgroundColor: sortColumn === column ? "#eee" : "",
                      color: sortColumn === column ? "#4338CA" : "#5F626B",
                    }}
                    className={
                      column === "ltp" && (isSmallScreen || isTablet)
                        ? "d-none"
                        : column === "percentChange" && isSmallScreen
                        ? "d-none"
                        : column === "previousClosing" &&
                          (isSmallScreen || isTablet || isDesktop)
                        ? "d-none"
                        : column === "volMultiplier" && isSmallScreen
                        ? "d-none"
                        : ""
                    }
                    align={column === "scriptName" ? "left" : "center"}
                    onClick={() => handleSort(column)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                    {column === "scriptName" && <>SCRIPT NAME</>}
                    {column === "volMultiplier" && <>VOL. MULTIPLIER</>}
                    {column === "ltp" && <>LTP</>}
                    {column === "percentChange" && <>%CHANGE</>}
                    {column === "previousClosing" && <>PREVIOUS CLOSING</>}
                    {column === "signalGenerationTime" && (
                      <>SIGNAL GENERATION TIME</>
                    )}
                    {column === "signal" && <>SIGNAL</>}

                    {column === sortColumn ? (
                      sortDirection === "asc" ? (
                        <AscSvg className="ms-1 table-svg" />
                      ) : sortDirection === "desc" ? (
                        <DescSvg className="ms-1 table-svg" />
                      ) : (
                        <MixSvg className="ms-1 table-svg"/>
                      )
                    ) : (
                      <MixSvg className="ms-1 table-svg" />
                    )}
                    </div>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    cursor: "pointer",
                    borderTop: "2px solid #F5F7FA",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {sortedData.length > 0 ? (sortedData.map((user) => (
            <RowData
              key={user.scriptName}
              row={user}
              isSmallScreen={isSmallScreen}
              isDesktop={isDesktop}
              isTablet={isTablet}
            />
          ))) : <tr className="text-center " ><td colSpan={header.length} className="pt-3">No recod Found</td></tr>}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default CollapsibleTable;
