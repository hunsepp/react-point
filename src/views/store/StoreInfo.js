import React from 'react';
import {Col, Card, CardBody, ListGroup, ListGroupItem,} from "shards-react";
import Checkboxes from "./Checkboxes";

export default function StoreInfo({store}) {
    return (
        <Col lg="6" md="12" className="mb-4">
            <Card small className="card-post card-post--1">
            <div
                className="card-post__image"
                style={{
                backgroundImage: `url(/api/upload/${store.account})`,
                }}
            >
            </div>

            <CardBody>
                <h5 className="card-title">{store?.name}</h5>

                <ListGroup small flush className="list-group-small">
                    <ListGroupItem className="d-flex px-3 border-top border-bottom">
                        <span className="text-semibold text-fiord-blue">상태</span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {store?.approve}
                        </span>
                    </ListGroupItem>

                    <ListGroupItem className="d-flex px-3 border-top border-bottom">
                        <span className="text-semibold text-fiord-blue">업종</span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {store?.category}
                        </span>
                    </ListGroupItem>

                    <ListGroupItem className="d-flex px-3 border-top border-bottom">
                        <span className="text-semibold text-fiord-blue">주소</span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {store?.address}
                        </span>
                    </ListGroupItem>

                    <ListGroupItem className="d-flex px-3 border-top border-bottom">
                        <span className="text-semibold text-fiord-blue">영업시간</span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {store?.open} ~ {store.close}
                        </span>
                    </ListGroupItem>

                    <ListGroupItem className="px-3 border-top border-bottom ">
                        <div dangerouslySetInnerHTML={{__html: store.discription.replace(new RegExp('\n', 'g'), '<br/>')}}></div>
                    </ListGroupItem>

                    {store?.option &&
                        <ListGroupItem className="d-flex px-3 border-top">
                            <Checkboxes option={store.option} read={true} />
                        </ListGroupItem>
                    }
                </ListGroup>
            </CardBody>
            </Card>
        </Col>
    )
}