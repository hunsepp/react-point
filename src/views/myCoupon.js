import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    // CardBody,
    // CardFooter,
    // Badge,
    // Button
  } from "shards-react";
  
import PageTitle from "../components/common/PageTitle";

export default function MyStore(){
    const PostsListOne = [
        {
          backgroundImage: require("../images/content-management/1.jpeg"),
          storeName:"카페1"
        }
      ]
      
    return (
        
        <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            {PostsListOne.map((post, idt) => (
            <PageTitle key = {idt} sm="4" title={post.storeName} className="text-sm-left" />
            ))}
        </Row>

        {/* First Row of Posts */}
        <Row>
        {PostsListOne.map((post, idt) => (
            <Col lg="6" md="10" sm="10" className="mb-4" key = {idt}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                >
                </div>
                
              </Card>
            </Col>
        ))}
        </Row>
        
        </Container>
        
        
    )
}