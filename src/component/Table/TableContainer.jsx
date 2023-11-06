import { Col, Row } from "react-bootstrap";
import CollapsibleTable from "./CollapsibleTable";
import Layout from "../common/Layout";

export default function TableContainer() {
  return (
    <>
      <Layout>
        <Row>
          <Col>
            <CollapsibleTable />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
