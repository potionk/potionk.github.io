import React, { Component } from 'react';
import { Col, Input, Row, ListGroup, ListGroupItem, Card, CardBody, CardHeader, FormGroup, Label, Form, Button } from 'reactstrap';

class CompatorMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      fieldNum: 1,
      field: [],
      getter: [false],
      setter: [false],
      result: "",
      constructorNum: 0,
      constructor: []
    };
  };

  handleClassName = (e) => {
    this.setState({
      className: e.target.value,
    })
  };

  handleFieldNum = (e) => {
    let value = parseInt(e.target.value);
    let gsArr = new Array(value).fill(false);
    this.setState({
      fieldNum: value,
      field: new Array(value).fill("arg"),
      getter: gsArr,
      setter: gsArr
    })
  };

  handleConstructorNum = (e) => {
    let value = parseInt(e.target.value);
    let gsArr = new Array(value);
    this.setState({
      constructor: gsArr,
      constructorNum: value
    })
  };

  handleRadio = (e) => {
    this.setState({
      argumentNum: e.target.value,
    })
  }


  handleArgsInput = (e) => {
    let field = this.state.field;
    field[e.target.dataset.index] = e.target.value.trim().split(";")[0];
    console.log(field)
    this.setState({
      field: field,
    });
  };

  handleResultTextArea = (e) => {
    // onChange가 없으면 warning 발생
  };

  handleCheckBox = (e) => {
    let getter = this.state.getter;
    let setter = this.state.setter;
    let index = e.target.dataset.index;
    let isGetter = e.target.checked === "getter" ? true : false;
    if (isGetter) {
      getter[index] = e.target.checked;
    } else {
      setter[index] = e.target.checked;
    }
    this.setState({
      getter: getter,
      setter: setter
    });
    console.log(getter)
    console.log(setter)
  }

  handleSubmit = (e) => {
    this.setState({
      p_translated_text: this.state.korean_text,
    });
  }

  copy() {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = this.state.result;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  makeFieldsInput() {
    let fieldNum = this.state.fieldNum;
    let arr = [];
    let exampleField = ["int a", "int b", "int c", "int d", "int e", "int f", "int g", "int h", "int i", "int j"];
    for (let i = 0; i < fieldNum; i++) {
      arr.push(i + 1);
    }
    return (
      <div>
        {arr.map((txt, index) => (
          txt === "" ? <br key={index} /> : (
            <div key={index}>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">{txt}번째 필드</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id={"field" + index} name={"field" + index} data-index={index} onChange={this.handleArgsInput} placeholder={exampleField[index]} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id={"getter" + index} name="getter" data-index={index} value={index} onChange={this.handleCheckBox} />
                    <Label className="form-check-label" check htmlFor="inline-checkbox1">Getter</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id={"setter" + index} name="setter" data-index={index} value={index} onChange={this.handleCheckBox} />
                    <Label className="form-check-label" check htmlFor="inline-checkbox2">Setter</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </div>
          )
        ))}
      </div>
    )
  }

  makeConstructorNumInput() {
    let fieldNum = this.state.fieldNum + 1;
    let arr = new Array(fieldNum).fill(0);
    return (
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="text-input">생성자 개수</Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="select" name="constructor_num_input" id="constructor_num_input" onChange={this.handleConstructorNum} >
            {arr.map((txt, index) => (
              txt === "" ? <br key={index} /> : (
                <option value={index} key={index}>{index}</option>
              )
            ))}
          </Input>
        </Col>
      </FormGroup>
    )
  }

  makeConstructorInput() {
    let field = this.state.field;
    let constructorNum=this.state.constructorNum;
    let arr=new Array(constructorNum).fill(1)
    return (
      <div>
        {arr.map((t, index) => (
            <FormGroup row key={index}>
              <Col md="3">
        <Label htmlFor="text-input">{index+1}번째 필드 선택</Label>
              </Col>
              <Col md="9">
                {field.map((txt, index) => (
                  <FormGroup check inline key={index}>
                    <Input className="form-check-input" type="checkbox" id={"getter" + index} name="getter" data-index={index} value={index} onChange={this.handleCheckBox} />
                    <Label className="form-check-label" check htmlFor="inline-checkbox1">{txt}</Label>
                  </FormGroup>
                ))}
              </Col>
            </FormGroup>
        ))}
      </div>
    )
  }

  printResult() {
    return (
      <Col>
        <ListGroup>
          <ListGroupItem key="result" active tag="button" action>result</ListGroupItem>
          <ListGroupItem key="copy" tag="button" action color="success" onClick={() => this.copy()} onDoubleClick={() => this.copy()}>{this.state.result}</ListGroupItem>
        </ListGroup>
      </Col>
    )
  }

  makeTestMain() {
    let args = this.state.args;
    let argNum = this.state.argumentNum;
    let inputs = this.state.inputs;
    for (let i = 0; i < inputs.length; i++) {
      let before = inputs[i];
      let after = "";
      for (let j = 0; j < before.length; j++) {
        if (before[j] === '[') {
          after += '{';
        } else if (before[j] === ']') {
          after += '}';
        } else {
          after += before[j];
        }
      }
      inputs[i] = after;
    }
    let result = "\tpublic static void main(String[] args) {\n\t\tSolution solution=new Solution();\n";
    for (let i = 0; i < argNum; i++) {
      result += "\t\t" + args[i] + " = " + inputs[i] + ";\n";
    }
    result += "\t\tsolution.solution(";
    for (let i = 0; i < argNum; i++) {
      result += args[i].split(" ")[1];
      if (i !== argNum - 1) {
        result += ", ";
      }
    }
    result += ");\n\t}";
    this.setState({
      result: result,
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Class Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Class Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="class_name_input" name="class_name_input" placeholder="Name" onChange={this.handleClassName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">필드 개수</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="field_num_input" id="field_num_input" onChange={this.handleFieldNum} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  {this.makeFieldsInput()}
                  {this.makeConstructorNumInput()}
                  {this.makeConstructorInput()}
                  <Button onClick={() => this.makeTestMain()}>Create!</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <strong>Result</strong>
              </CardHeader>
              <CardBody>
                <Input type="textarea" value={this.state.result} rows="9" onChange={this.handleResultTextArea}></Input>
                <Button onClick={() => this.copy()}>클립보드에 복사</Button>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
    );
  }
}

export default CompatorMaker;