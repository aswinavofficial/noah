import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {APIService2} from '../services/api2'
import {addCustomItem, setSelectedState} from '../actions/choices'
import { withRouter,Link } from 'react-router-dom';


var numbers = [...Array(5).keys()];
var donations =  [
  {
      "id": 1,
      "item_name": "Item 1",
      "status" : {
          "code": "2",
          "label": "Rejected"
      }
  },
  {
      "id": 2,
      "item_name": "Item 2",
      "status" : {
          "code": "1",
          "label": "Received"
      }
  },
  {
    "id": 3,
    "item_name": "Item 3",
    "status" : {
        "code": "0",
        "label": "Submitted"
    }
}
];

var searchResult =
{
  "msg": "Ok",
  "code": 200,
  "donor": {
      "full_name": "John Doe",
      "phone": "9876543210",
      "district": "Ernakulam",
      "state": "Kerala",
      "pincode": "123456",
  },
  "donations": [
      {
          "id": 1,
          "item_name": "Item 1",
          "status" : {
              "code": "stage-1",
              "label": "Stage 1"
          }
      },
      {
          "id": 2,
          "item_name": "Item 2",
          "status" : {
              "code": "stage-3",
              "label": "Stage 3"
          }
      }
  ]
}


var donations =  [
  {
      "id": 1,
      "item_name": "Item 1",
      "status" : {
          "code": "2",
          "label": "Rejected"
      }
  },
  {
      "id": 2,
      "item_name": "Item 2",
      "status" : {
          "code": "1",
          "label": "Received"
      }
  },
  {
    "id": 3,
    "item_name": "Item 3",
    "status" : {
        "code": "0",
        "label": "Submitted"
    }
}
];



var d =  searchResult.donations;

class CollectionHubAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: '',
          status: '0',
          itemName : '',
          donationId : '0'
        };
        
        this.search = this.search.bind(this);
        this.statusUpdate = this.statusUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.api = new APIService2(props.dispatch)
       
      }
       
      
      handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
      }
    
      search() {
        console.log( this.state.phone );
        this.api.getDonorInfoByPhoneNumber(this.state.phone);
        this.phoneNumber = this.state.phone


      }

      addItem() {
        console.log(this.state.status);
        console.log(this.state.itemName)
        console.log(this.state.phone)
        this.api.addNewItemForDonor(this.state.phone,this.state.itemName,this.state.status)
      }

      statusUpdate(event,donationId) {
       console.log(donationId)
       console.log(event.target.value);
       this.api.updateDonorItemStatus(event.target.value,donationId)


      }
    


    render() {
      
        return (
        <section id="collection-hub-admin" className="mx-auto" style={{maxWidth: "800px"}} >
        <div className="container">
        <div className="row">
            <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading">Collection Hub Admin</h2>
                <hr className="my-4" />
            </div>
        </div>
        <div className="row">
        <div className="col-sm-4">
        Phone Number
        </div>
        <div className="col-sm-4">
        <input 
        type="text" 
        name="phone" 
        placeholder="Enter Phone Number" 
        value={ this.state.phone }
        onChange={ this.handleChange } 
      />
        
        </div>

        <div className="col-sm-4">
        <button value="Send" onClick={ this.search }>Search</button>
        </div>
       </div>
          <br/>
              <div className="row"><div className="col-12">
              <div className="card">
              <div className="card-body">
                <table className="table borderless">
    
                  <tbody>
                  <tr>
                    <th></th>
                    <th></th>
                    </tr>
                    <tr>
                    <td>Name</td>
                    <td>{searchResult.donor.full_name}</td>
                    </tr>

                     <tr>
                    <td>Phone</td>
                    <td>{searchResult.donor.phone}</td>
                    </tr>

                     <tr>
                    <td>State</td>
                    <td>{searchResult.donor.state}</td>
                    </tr>

                     <tr>
                    <td>District</td>
                    <td>{searchResult.donor.district}</td>
                    </tr>

                     <tr>
                    <td>PinCode</td>
                    <td>{searchResult.donor.pincode}</td>
                    </tr>
                   
                  </tbody>
                </table>
                </div>
                </div>
              </div>
              </div>

              <br/>

              
              <ul style={{ listStyleType: "none" }}>
              {
          donations.map( details=> 
          
          <li key={details.id}> 
          <div className="card">
          <div className="card-body">
         <div className="row">
             <div className="col-sm-8">Item{details.id}
             </div>
             <div className="col-sm-4">
             <select onChange={ (e)=>{this.statusUpdate(e,details.id)}} value ={ details.status.code} name="status">
               <option value="0">Submitted</option>
               <option value="1">Received</option>
               <option value="2">Rejected</option>
             </select>
             </div>
             </div>
 </div>
</div> <br/></li>
          
          )
       }

       <li > 
          <div className="card">
          <div className="card-body">
         <div className="row">
             <div className="col-sm-8">
             <input type="text" name="itemName" onChange={ this.handleChange } placeholder="Add New Item" />
             </div>
             <div className="col-sm-4">
             <select value={0} onChange={ this.handleChange } name="status">
              <option value="0">Submitted</option>
               <option value="1">Received</option>
               <option value="2">Reject</option>
             </select>
             <button onClick={ this.addItem} style={{marginLeft:"10px"}}>Add</button>
             </div>
             </div>
 </div>
</div> <br/></li>

              </ul>
             

        </div>
    
    
</section>
        )
    }
}

export default CollectionHubAdmin;
