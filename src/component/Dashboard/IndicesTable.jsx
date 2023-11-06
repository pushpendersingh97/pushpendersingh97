import { Badge, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { ProductService } from "../ProductService";
import { ProgressBar } from "primereact/progressbar";
import InputGroup from "react-bootstrap/InputGroup";
import Search from "@mui/icons-material/Search";

export default function IndicesTable() {
  const [indices, setIndices] = useState([]);
  const [sectorPerformance, setSectorPerformance] = useState([]);
  const [filteredIndices, setFilteredIndices] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [searchIndicesText, setIndicesSearchText] = useState("");
  const [searchSectorText, setSearchSectorText] = useState("");

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      setIndices(data[2].sectoralIndicesData);
      setFilteredIndices(data[2].sectoralIndicesData);
      setSectorPerformance(data[3].sectorPerformance);
      setFilteredSectors(data[3].sectorPerformance);
    });
  }, []);

  const dataChangeTemplate = (item) => {
    return (
      <Badge pill bg={item.status}>
        {item.changeprec}
      </Badge>
    );
  };

  const changeTemplate = (item) => {
    return <span className={item.status}>{item.change}</span>;
  };
  const activityBodyTemplate = (item) => {
    const percentage = (item.marketcap / 10000000) * 100;
    const color = item.status === "success" ? "#0CC500" : "#FB3766";
    const customStyle = {
      height: "1.5rem",
      background: item.status === "success" ? "#EAFDF6" : "#FFEBF0",
    };
    return (
      <ProgressBar
        value={percentage}
        showValue={false}
        style={customStyle}
        color={color}
      ></ProgressBar>
    );
  };
  return (
    <>
      <Row>
        <Col>
          <h4 className="section-heading text-uppercase mb-4">
            Heading for this section
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <div className="dashboard-card mb-4">
            <div className="card-header">
              <span className="heading table-heading">Sectoral Indices</span>
              <Link to="/table" className="py-0 border-none weight-600">
                View More
              </Link>
            </div>
            <div className="card-search">
              <InputGroup className="mb-3">
                <InputGroup.Text id="sectoralIndices">
                  <Search />
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchIndicesText}
                  onChange={(e) => {
                    const searchText = e.target.value;
                    setIndicesSearchText(searchText);
                    const filteredList = indices?.filter(
                      (res) =>
                        res?.name
                          ?.toUpperCase()
                          .includes(searchText.toUpperCase()) ||
                        res?.price?.toString()?.includes(searchText)
                    );
                    setFilteredIndices(filteredList);
                  }}
                />
              </InputGroup>

              {/* <Form.Select aria-label="Sort By">
                <option>Sort by</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select> */}
            </div>
            <div className="table-container">
              <DataTable
                value={filteredIndices}
                size="small"
                sortMode="multiple"
                removableSort
                scrollable
                scrollHeight="15rem"
              >
                <Column field="name" header="name" sortable></Column>
                <Column field="price" header="price" sortable></Column>
                <Column header="change" body={changeTemplate}></Column>
                <Column header="% change" body={dataChangeTemplate} align="center"></Column>
              </DataTable>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="dashboard-card mb-4">
            <div className="card-header">
              <span className="heading table-heading">Sector Performance</span>
              <Link to="/tables" className="py-0 weight-600 border-none">
                View More
              </Link>
            </div>
            <div className="card-search">
              <InputGroup className="mb-3">
                <InputGroup.Text id="sectorPerformance">
                  <Search />
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchSectorText}
                  onChange={(e) => {
                    const searchText = e.target.value;
                    setSearchSectorText(searchText);
                    const filteredList = sectorPerformance?.filter(
                      (res) =>
                        res?.name
                          ?.toUpperCase()
                          .includes(searchText.toUpperCase()) ||
                        res?.marketcap?.toString()?.includes(searchText)
                    );
                    setFilteredSectors(filteredList);
                  }}
                />
              </InputGroup>

              {/* <Form.Select aria-label="Sort By">
                <option>Sort by</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select> */}
            </div>
            <div className="table-container">
              <DataTable
                value={filteredSectors}
                size="small"
                sortMode="multiple"
                removableSort
                scrollable
                scrollHeight="15rem"
              >
                <Column field="name" header="sector name" sortable></Column>
                <Column
                  showFilterMatchModes={false}
                  style={{ minWidth: "8rem" }}
                  body={activityBodyTemplate}
                />
                <Column field="marketcap" header="marketcap" sortable></Column>
                <Column header="change" body={changeTemplate}></Column>
                <Column header="%change" body={dataChangeTemplate} align="center"></Column>
              </DataTable>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
