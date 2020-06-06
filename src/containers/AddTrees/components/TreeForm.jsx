import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import { auth } from '../../Firebase/auth'
import { db } from '../../Firebase/firestore'


class TreeForm extends PureComponent {
  checkIP = ip => {
    let input0 = document.getElementById('input_0').value,
    input1 = document.getElementById('input_1').value,
    input2 = document.getElementById('input_2').value,
    input3 = document.getElementById('input_3').value,
    input4 = document.getElementById('input_4').value,
    input5 = document.getElementById('input_5').value;
    let our_tree = `${input0}:${input1}:${input2}:${input3}:${input4}:${input5}`
    return ip === our_tree;
  }
  handleSubmit = () => {
    let input0 = document.getElementById('input_0').value,
        input1 = document.getElementById('input_1').value,
        input2 = document.getElementById('input_2').value,
        input3 = document.getElementById('input_3').value,
        input4 = document.getElementById('input_4').value,
        input5 = document.getElementById('input_5').value;
    if(input0.length >= 2 && input1.length >= 2 && input2.length >= 2 && input3.length >= 2 && input4.length >= 2 && input5.length >= 2) {
      let our_tree = `${input0}:${input1}:${input2}:${input3}:${input4}:${input5}`
      console.log(our_tree);
      db.collection('users').doc(auth.currentUser.uid).get()
      .then(user => {
        let data = user.data();
        console.log(data);
        if(data.trees.find(this.checkIP) ===  undefined){
          console.log("The Key is new so adding")
          data.trees.push(our_tree);
          db.collection('users').doc(auth.currentUser.uid).set(data)
          .then(() => console.log("Data Stored Successfully"))
          .catch(err => console.log(err));
        }
        else{
          console.log("The Key already Exists");
        }
      })
     return; 
    }
    console.log("Values Not Enterd Correctly");
  } 
  moveAhead = e => {
    let currInput = e.target.id.split('_');
    if(e.target.value.length === 2) {
      let nextInput = document.getElementById('input_' + ( parseInt(currInput[1]) + 1 ));
      nextInput.focus();
    }
  }
  render(){

    return(
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Enter Your Tree's MAC ID</h5>

            </div>
            <form className="form" >
              <div className="form__form-group">
                <span className="form__form-group-label">Default Label</span>
                <div className="form__form-group-field">
                  <input style={styleBox.treeIpInput} id='input_0' onInput={this.moveAhead} type="text" maxLength={2} /> <span style={styleBox.colons} >:</span>
                  <input style={styleBox.treeIpInput} id='input_1' onInput={this.moveAhead} type="text" maxLength={2} /> <span style={styleBox.colons} >:</span>
                  <input style={styleBox.treeIpInput} id='input_2' onInput={this.moveAhead} type="text" maxLength={2} /> <span style={styleBox.colons} >:</span>
                  <input style={styleBox.treeIpInput} id='input_3' onInput={this.moveAhead} type="text" maxLength={2} /> <span style={styleBox.colons} >:</span>
                  <input style={styleBox.treeIpInput} id='input_4' onInput={this.moveAhead} type="text" maxLength={2} /> <span style={styleBox.colons} >:</span>
                  <input style={styleBox.treeIpInput} id='input_5' type="text" maxLength={2} />
                  <br />
                </div>
              </div>
              <Button color="success" onClick={this.handleSubmit} className="rounded" outline>Add Now</Button>
            </form>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
const styleBox = {
  treeIpInput : {
    marginRight: 10,
    marginLeft: 10,
    width: 50
  },
  colons: {
    // margin: 5,
    color: 'dimgrey',
    fontWeight: 'bolder',
    fontSize: 20      
  }
}
export default TreeForm;
// export default reduxForm({
  // form: 'vertical_form', // a unique identifier for this form
// })(TreeForm);
