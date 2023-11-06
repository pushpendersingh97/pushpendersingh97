import { Badge, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { ProductService } from "../ProductService";
import SkeletonLoader from "../common/SkeletonLoader";
import InputGroup from "react-bootstrap/InputGroup";
import Search from "@mui/icons-material/Search";

export default function StockAction() {
  const [isLoading, setIsLoading] = useState(true);
  const [topGainer, setTopGainer] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [searchTopGainersText, setSearchTopGainersText] = useState("");
  const [searchTopLosersText, setSearchTopLosersText] = useState("");

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      setTimeout(() => {
        setTopGainer(data[0].topGainer);
        setTopLosers(data[1].topLosers);
        setIsLoading(false);
      }, 5000);
    });
  }, []);

  const dataChangeTemplate = (item) => {
    return (
      <Badge pill bg={item.status}>
        {item.dataChange}
      </Badge>
    );
  };

  const changeTemplate = (item) => {
    return <span className={item.status}>{item.change}</span>;
  };

  // Function to filter data based on search query
  const filterData = (data, searchText) => {
    return data.filter((item) => {
      // Check if any value in the row contains the search query (case-insensitive)
      for (const key in item) {
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(searchText.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  };

  return (
    <>
      <Row>
        <Col>
          <h4 className="section-heading text-uppercase mb-4">Stock Action</h4>
        </Col>
      </Row>
      {isLoading ? (
        <SkeletonLoader numColumns={3} />
      ) : (
        <Row>
          <Col xs={12} md={6} lg={4} xl={4} xxl={4}>
            <div className="dashboard-card mb-4">
              <div className="card-header">
                <span className="heading table-heading">Top Gainer</span>
                <Link to="/table" className="py-0 weight-600 border-none">
                  View More
                </Link>
              </div>
              <div className="card-search">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="topGainer">
                    <Search />
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    placeholder="Search Top Gainers"
                    value={searchTopGainersText}
                    onChange={(e) => setSearchTopGainersText(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="table-container">
                <DataTable
                  value={filterData(topGainer, searchTopGainersText)}
                  size="small"
                  sortMode="multiple"
                  removableSort
                  scrollable
                  scrollHeight="15rem"
                >
                  <Column field="company" header="company" sortable></Column>
                  <Column field="price" header="price" sortable></Column>
                  <Column header="change" body={changeTemplate}></Column>
                  <Column header="%Gain" body={dataChangeTemplate} className="text-center"></Column>
                </DataTable>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} xl={4} xxl={4}>
            <div className="dashboard-card mb-4">
              <div className="card-header">
                <span className="heading table-heading">Top Losers</span>
                <Link to="/table" className="py-0 weight-600 border-none">
                  View More
                </Link>
              </div>
              <div className="card-search">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="topLoser">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search Top Losers"
                    value={searchTopLosersText}
                    onChange={(e) => setSearchTopLosersText(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="table-container">
                <DataTable
                  value={filterData(topLosers, searchTopLosersText)}
                  size="small"
                  sortMode="multiple"
                  removableSort
                  scrollable
                  scrollHeight="15rem"
                >
                  <Column field="company" header="company" sortable></Column>
                  <Column field="price" header="price" sortable></Column>
                  <Column header="change" body={changeTemplate}></Column>
                  <Column header="%Gain" body={dataChangeTemplate} className="text-center"></Column>
                </DataTable>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} xl={4} xxl={4}>
            <div className="dashboard-card mb-4">
              <div className="card-header">
                <span className="heading table-heading">Top Gainer</span>
                <Link to="/table" className="py-0 weight-600 border-none">
                  View More
                </Link>
              </div>
              <div className="card-search">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search Top Gainers"
                    value={searchTopGainersText}
                    onChange={(e) => setSearchTopGainersText(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="table-container">
                <DataTable
                  value={filterData(topGainer, searchTopGainersText)}
                  size="small"
                  sortMode="multiple"
                  removableSort
                  scrollable
                  scrollHeight="15rem"
                >
                  <Column field="company" header="company" sortable></Column>
                  <Column field="price" header="price" sortable></Column>
                  <Column header="change" body={changeTemplate}></Column>
                  <Column header="%Gain" body={dataChangeTemplate} className="text-center"></Column>
                </DataTable>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
