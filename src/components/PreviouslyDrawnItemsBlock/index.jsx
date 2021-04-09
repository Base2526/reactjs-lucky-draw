import React from "react";
import { Card, Table } from "tabler-react";
import "./style.css";

const PreviouslyDrawnItemsBlock = props => (
  <Card
    title="รายการผู้โชคดีทั้งหมด"
    className="past-drawn-block"
    body={
      <Table>
        <Table.Body className="past-drawn-item">
          {
            props.pastDrawnItems.length === 0
            ? "ยังไม่มีรายการผู้โชคดี."
            : props.pastDrawnItems.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Col>ลำดับที่ {index + 1} - {item}</Table.Col>
                </Table.Row>
              ))
              }
        </Table.Body>
      </Table>
    }
  />
);

export default PreviouslyDrawnItemsBlock;
