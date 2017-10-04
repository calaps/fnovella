import React from "react";
import ListItem from "./ListItem";
import {connect} from 'react-redux';
/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData:[
        {
          id:1,
          firstName: 'abc',
          email:'abc@co.uk',
          firstLastName:'cde',
          cellphone: 123456,
          gender: 'Male',
          bornDate:'01/01/1990'
        },{
          id:2,
          firstName: 'abc',
          email:'abc@co.uk',
          firstLastName:'cde',
          cellphone: 123456,
          gender: 'Male',
          bornDate:'01/01/1990'
        },{
          id:3,
          firstName: 'abc',
          email:'abc@co.uk',
          firstLastName:'cde',
          cellphone: 123456,
          gender: 'Male',
          bornDate:'01/01/1990'
        },
      ]
    }
  }
  render() {
    return (
      <article className="article">
        <h2 className="article-title">Lista de catalogos</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-header no-padding-h">Basic table</div>
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">FirstName</th>
                      <th className="mdl-data-table__cell--non-numeric">LastName</th>
                      <th className="mdl-data-table__cell--non-numeric">Email</th>
                      <th className="mdl-data-table__cell--non-numeric">CellPhone</th>
                      <th className="mdl-data-table__cell--non-numeric">Gender</th>
                      <th className="mdl-data-table__cell--non-numeric">Date of Birth</th>
                    </tr>
                    </thead>

                    <tbody>


                    {
                      this.state.usersData.map((userData) => {
                        return <ListItem key={userData.id} {...userData}/>
                      })
                    }
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>


        </div>


      </article>
    );
  }

}

module.exports = connect()(ListElements);
