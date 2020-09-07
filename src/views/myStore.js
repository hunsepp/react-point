import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    // CardFooter,
    // Badge,
    Button
  } from "shards-react";
  
import PageTitle from "../components/common/PageTitle";

export default function MyStore(){
    const PostsListOne = [
        {
          backgroundImage: require("../images/content-management/1.jpeg"),
          storeName:"카페1"
        },
        {
          backgroundImage: require("../images/content-management/2.jpeg"),
          storeName:"카페2"
        },
        {
          backgroundImage: require("../images/content-management/3.jpeg"),
          storeName:"카페3"
        },
        {
          backgroundImage: require("../images/content-management/4.jpeg"),
          storeName:"카페4"
        },
        {
          backgroundImage: require("../images/content-management/5.jpeg"),
          storeName:"카페5"
        },
        {
          backgroundImage: require("../images/content-management/6.jpeg"),
          storeName:"카페6"
        },
        {
          backgroundImage: require("../images/content-management/7.jpeg"),
          storeName:"카페7"
        },
        {
          backgroundImage: require("../images/content-management/8.jpeg"),
          storeName:"카페8"
        }
      ]
      
    return (
        <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="선택해주세요" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
        {PostsListOne.map((post, idt) => (
            <Col lg="4" md="6" sm="10" className="mb-4" key = {idt}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                >
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="./myCoupon" className="text-fiord-blue">
                    {post.storeName}
                    </a>
                  </h5>
                  
                  
                </CardBody>
              </Card>
            </Col>
        ))}
        </Row>
        
        </Container>
        
        
    )
}