import React, { useEffect, useState } from 'react'

import { Col, Row } from "react-bootstrap";

import Layout from "../common/Layout";
import ChartsTable from './ChartsTable';
import Chart from '../Chart';
import FullPageLoader from '../common/FullPageLoader';
import { useDarkTheme } from '../../utils/DarkThemeContext';

export const ChartsLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if(isLoading) {
    return (
      <FullPageLoader isDarkTheme={isDarkTheme}/>
    )
  }

  return (
    <>
      <Layout>
        <Row>
          <Col xs={12}>
            <ChartsTable />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='mt-3'>
            <Chart isDarkTheme={isDarkTheme}/>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
