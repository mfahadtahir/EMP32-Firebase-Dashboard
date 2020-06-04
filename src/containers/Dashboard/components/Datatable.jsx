import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import DataPaginationTable from '../../../shared/components/table/DataPaginationTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import { db } from '../../Firebase/firestore'
import { auth } from '../../Firebase/auth'
import { realtimeDB }  from '../../Firebase/database'

export default class DataTable extends PureComponent {
  constructor() {
    super();
    this.heads = [
      {key: 'id', name: '#', width: 80 },
      {key: 'name', name: 'Tree Name', sortable: true,},
      {key: 'Dust', name: 'Dust', sortable: true,},
      {key: 'VOC',  name: 'VOC', sortable: true,},
      {key: 'co2',  name: 'Carbon Dioxide', sortable: true,},
      {key: 'hum',  name: 'Humidity', sortable: true},
      {key: 'tmp',  name: "Temperature", sortable: true},
      // {key: 'buisnessId', name: "Buisness", 
      // formatter :<button style={{marginBottom: 0}} type = "button" className="btn btn-primary" onClick = {() => console.log(this)} > Item Details  </button>
    // }
    ];

    this.state = {
      rows: [],
      rowsToShow: [],
      pageOfItems: 1,
      itemsToShow: 10,
    };
  }
  
  componentDidMount(){

    let data = [], currData = {id: '', name: ''}, i = 1;
    console.log("Hello form did mount");

    // let arry = ['80:7D:3A:DC:BF:40', 'B4:E6:2D:FB:3D:15'];
    db.collection('users').doc(auth.currentUser.uid).get()
    .then(userData => {
      
      realtimeDB.ref('/').on("value", function(dataSnapshot) {
        data = [];
        i = 1;
        userData.data().trees.forEach(tree => 
          realtimeDB.ref(tree).once("value", function(dataSnapshot) {
            let Data = dataSnapshot.val();
            console.log(i,Data);
            if(!Data) return;
              currData = dataSnapshot.val().current;
              currData.id = i++;
              currData.name = dataSnapshot.val().name;
              data.push(currData);            
            })
          )
        this.setState({rows: data, rowsToShow: this.filterRows(data, 1, 10)})
      }.bind(this))
    })
  }
  onChangePage = (pageOfItems) => {
    const { rows, itemsToShow } = this.state;
    if (pageOfItems) {
      const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow, pageOfItems });
    }
  };

  filterRows = (originalRows, pageNumber, rowsOnPage) => {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  };

  onSorting = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    };
    const {
      rows, pageOfItems, itemsToShow,
    } = this.state;
    if (sortDirection !== 'NONE') {
      let sortRows = [...rows].sort(comparer);
      sortRows = this.filterRows(sortRows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow: sortRows });
      return sortRows;
    }
    const sortRows = this.filterRows(rows, pageOfItems, itemsToShow);
    this.setState({ rowsToShow: sortRows });
    return sortRows;
  }
  
  
  render() {
    const { rows, itemsToShow, pageOfItems, rowsToShow, } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {
              rows ?

              <DataPaginationTable
                heads={this.heads}
                rows={rowsToShow}
                onSorting={this.onSorting}
              />
            :   
            <div class="load">
              <div class="load__icon-wrap">
                <svg class="load__icon">
                  <path fill="#88C24E" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
              </div>
            </div>
            }
            <Pagination
              itemsCount={rows.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={this.onChangePage}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
