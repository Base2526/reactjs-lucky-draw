import React, { Component } from "react";
import { Form, Button, Header } from "tabler-react";
import "./style.css";

class DrawForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target);
  }

  render() {
    const {
      style,
      className,
      onSubmit,
      placeholder,
      value,
      drawItems,
      handleSkipAnimationChange,
      handleRemoveDrawnItemChange
    } = this.props;


    // console.log(drawItems = '1\n2\n')
    // drawItems.map((i, k)=>{
    //   console.log(i, k)
    // })

    return (
      <div style={style} className={className}>
        <Header.H3>รายการผู้เข้าร่วมทั้งหมด</Header.H3>
        <div className="form">
          <Form onSubmit={onSubmit}>
            <Form.FieldSet>
              <Form.Group isRequired>
                <Form.Textarea
                  name="drawItems"
                  placeholder={placeholder}
                  value={value}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Checkbox
                  name="skipAnimation"
                  label="ไม่แสดง Animation"
                  onChange={handleSkipAnimationChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Checkbox
                  name="noRepeat"
                  label="Remove Drawn Item"
                  onChange={handleRemoveDrawnItemChange}
                />
              </Form.Group> */}
              {/* <Button
                color="primary"
                type="submit"
                disabled={drawItems.length < 2}
              >
              บันทึกการตั้งค่า
              </Button> */}
            </Form.FieldSet>
          </Form>
        </div>
      </div>
    );
  }
}

export default DrawForm;
