import React from 'react';
import { Col, Container, Row, Collapse, Card, CardBody } from 'reactstrap';
// import DownIcon from 'mdi-react/ChevronDownIcon';
import {auth} from '../Firebase/auth'
// import { db }  from '../LogIn/Firebase/firestore'
import DataTable from './components/Datatable';


class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      data: {},
    };
  }
  componentDidMount(){
    if(auth.currentUser){
      let data = [], id, name;
    } 
  }
  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };
  handleState = (table) => {
    console.log('Changing State To: ', table);
    this.setState({buisnessTable: table})
  }

  render(){
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Dashboard</h3>
          </Col>
        </Row>
        <Row>
          <DataTable data={this.state.data} />
        </Row>
      </Container>
    )
  }
}
export default Dashboard;
