import React, { Component } from 'react';
import { Col, Input, Row, ListGroup, ListGroupItem, Card, CardBody, CardHeader, FormGroup, Label, Form, Button } from 'reactstrap';

class MainMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: "",
      argumentNum: 1,
      args: ["첫번째 인자"],
      inputs: [""],
      result: ""
    };
  };

  handleChange = (e) => {
    let solutionFunc = e.target.value;
    let t1 = solutionFunc.split("(");
    if (t1.length >= 2) {
      let t2 = t1[1].split(")");
      let args = t2[0].split(",");
      let argsArr = [];
      let argsNum = args.length;
      var inputs = new Array(argsNum);
      for (let i = 0; i < argsNum; i++) {
        argsArr.push(args[i].trim());
      }
      this.setState({
        args: argsArr,
        argumentNum: argsNum,
        inputs: inputs,
        methodInfo: t1[0]
      })
    }
  };

  handleRadio = (e) => {
    this.setState({
      argumentNum: e.target.value,
    })
  }


  handleArgsInput = (e) => {
    let inputArr = this.state.inputs;
    inputArr[e.target.dataset.index] = e.target.value.trim();
    this.setState({
      inputs: inputArr,
    });
  };


  handleSubmit = (e) => {
    this.setState({
      p_translated_text: this.state.korean_text,
    });
  };

  handleResultTextArea = (e) => {
    // onChange가 없으면 warning 발생
  };

  copy() {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = this.state.result;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  makeArgsInput() {
    let argNum = this.state.argumentNum;
    let args = this.state.args;
    let arr = [];
    for (let i = 0; i < argNum; i++) {
      arr.push(i + 1);
    }
    return (
      <div>
        {arr.map((txt, index) => (
          txt === "" ? <br key={index} /> : (
            <FormGroup row key={index}>
              <Col md="3">
                <Label htmlFor="text-input">{args[index]}</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id={"args" + index} name={"args" + index} data-index={index} onChange={this.handleArgsInput} placeholder={args[index].split(" ")[1] + "의 input"} />
              </Col>
            </FormGroup>
          )
        ))}
      </div>
    )
  }

  printResult() {
    return (
      <Col>
        <ListGroup>
          <ListGroupItem key="0" active tag="button" action>result</ListGroupItem>
          <ListGroupItem key="1" tag="button" action color="success" onClick={() => this.copy()} onDoubleClick={() => this.copy()}>{this.state.result}</ListGroupItem>
        </ListGroup>
      </Col>
    )
  }

  makeTestMain() {
    let args = this.state.args;
    let argNum = this.state.argumentNum;
    let inputs = this.state.inputs;
    let methodInfo = this.state.methodInfo.split(" ");
    let methodName, returnType;
    if (methodInfo.length === 3) {
      returnType = methodInfo[1];
      methodName = methodInfo[2];
    } else {
      returnType = methodInfo[0];
      methodName = methodInfo[1];
    }
    for (let i = 0; i < inputs.length; i++) {
      let argType=args[i].split("[")[0];
      let before = inputs[i];
      let after = "";
      for (let j = 0; j < before.length; j++) {
        if(argType==="char"&&before[j]==="\""){
          after+="'";
        } else if (before[j] === '[') {
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
    if (returnType === "void") {
      result += "\t\tsolution.solution(";
    } else {
      result += "\t\t" + returnType + " result = solution." + methodName + "(";
    }

    for (let i = 0; i < argNum; i++) {
      result += args[i].split(" ")[1];
      if (i !== argNum - 1) {
        result += ", ";
      }
    }
    result += ");\n"
    if (returnType !== "void") {
      result += "\t\tSystem.out.println(result);\n";
    }
    result+= "\t}";
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
                <strong>Solution method info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Solution 메소드</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="method_input" name="method_input" placeholder="public int solution(int[][] board, int[] moves) {" onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  {this.makeArgsInput()}
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

export default MainMaker;