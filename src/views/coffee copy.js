import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Transfer from './Transfer';
import {Americano,CaffeLatte,Espresso} from '../images/coffee_Img/imgPack';
import {Row, Col, Card, CardBody, Button} from "shards-react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Coffee() {
  const classes = useStyles();
  const [price, setPrice] = useState(0);
  const [value, setValue] = React.useState(0);

  const pButton = () => {
    setPrice(price + 3000);
  };
  const cButton = () => {
    setPrice(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="커피" {...a11yProps(0)} />
            <Tab label="음료" {...a11yProps(1)} />
            <Tab label="Coffee Three" {...a11yProps(2)} />
            <Tab label="Coffee Four" {...a11yProps(3)} />
            <Tab label="Coffee Five" {...a11yProps(4)} />
            <Tab label="Coffee Six" {...a11yProps(5)} />
            <Tab label="Coffee Seven" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Row>
          <Col lg="8">
            <div style={{ height: 200 ,weigt:200  }}>
              <Col  className="mb-4">
                <Card small>
                  <CardBody>
                    <Americano/>
                    <Row>
                      <Col lg="6" md="12" className="form-group">
                        <h2>아메리카노</h2>                               
                      </Col>
                      <Col lg="6" md="12" className="form-group">
                        <label htmlFor="menu-price">2500원</label>
                      </Col>
                      <Col className="d-flex px-3 border-0">
                          <Button pill theme="info" size="sm" className="ml-auto" onClick={pButton}>추가</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div style={{ height: 200 ,weigt:200  }}>
              <Col  className="mb-4">
                <Card small>
                  <CardBody>
                    <CaffeLatte/>
                    <Row>
                      <Col lg="6" md="12" className="form-group">
                        <h2>카페라떼</h2>                            
                      </Col>
                      <Col lg="6" md="12" className="form-group">
                        <label htmlFor="menu-price">3500원</label>
                      </Col>
                      <Col className="d-flex px-3 border-0">
                          <Button pill theme="info" size="sm" className="ml-auto" onClick={pButton}>추가</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div style={{ height: 200 ,weigt:200  }}>
              <Col  className="mb-4">
                <Card small>
                  <CardBody>
                    <Espresso/>
                    <Row>
                      <Col lg="6" md="12" className="form-group">
                        <h2>에스프레소</h2>                            
                      </Col>
                      <Col lg="6" md="12" className="form-group">
                        <label htmlFor="menu-price">3000원</label>
                      </Col>
                      <Col className="d-flex px-3 border-0">
                          <Button pill theme="info" size="sm" className="ml-auto" onClick={pButton}>추가</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </Col>
        </Row>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Coffee Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Coffee Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Coffee Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Coffee Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Coffee Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Coffee Seven
        </TabPanel>
      </div>
        <Col lg="4">
          <Card small>
            <CardBody>
              <h1>총 주문 가격 {price}</h1>
              <Button theme="warning"onClick={cButton}>전체취소</Button>
              <Transfer value={price}/>    
            </CardBody>
          </Card>
        </Col>
    </div>
    
  );
}