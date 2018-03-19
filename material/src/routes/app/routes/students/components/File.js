import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "lodash-es/map"; //to use map in a object
import { personal_documents, gender, countries, privileges } from '../../../../../constants/data_types';
import { userValidator } from "../../../../../actions/formValidations"; //form validations
//import { signUpRequest } from './../../../../../actions'; //for use the Rest_API
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  participantAddRequest,
  catalogsGetRequest,
  participantUploadRequest
} from '../../../../../actions';
import { convertDateToHTMLInputDateValue } from '../../../../../utils/helpers';
import ReactFileReader from 'react-file-reader';

let self;

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fileName: ''
    };
    this.csvData = [];

    self = this;
  }

  componentWillMount() {
    this.props.actions.catalogsGetRequest();
  }

  handleFiles = (files) => {
    console.log(files[0].name);
    this.setState({ fileName: files[0].name });
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      var csv = reader.result;
      var lines = csv.split("\n");
      var result = [];
      var result_user = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      for (var k = 0; k < result.length - 1; k++) {
        result[k].updateFields = { "privilege": result[k].privilege, "phone": result[k].phone, "bornDate": result[k].bornDate };
        result_user.push(result[k]);
      }
      self.csvData = result_user;
    }
    reader.readAsText(files[0]);

  }
  /** user data send function */
  onUpload = () => {
    this.setState({ errors: {}, isLoading: true });
    console.log(self.csvData);
    this.props.actions.participantUploadRequest(self.csvData).then(
      (response) => {
        //Save the default object as a provider
        if (response) {
          self.props.changeView('VIEW_ELEMENT');
        }
      },
      (error) => {
        console.log("An Error occur with the Rest API");
        self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
      })
  }


  render() {
    const { errors } = this.state;
    this.styles = {
      button: {
        margin: 12,
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
      span: {
        float: 'left'
      },
      selected: {
        paddingTop: '20px',
        float: 'left',
        fontSize: '18px',
        borderBottom: '1px solid #66BB6A'
      }
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>

                  <div className="form-group row">
                    <div className="col-md-10">
                      <span style={this.styles.span}>
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                          <RaisedButton
                            icon={<i className="material-icons" style={{ color: '#66BB6A' }}>find_in_page</i>}
                            label="Seleecionar archivo CSV"
                            labelPosition="before"
                            containerElement="label"> </RaisedButton>
                        </ReactFileReader>
                      </span>
                      <span style={this.styles.selected}>{this.state.fileName}</span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-10">
                      <RaisedButton disabled={this.state.isLoading}
                                    icon={<i className="material-icons" style={{ color: '#66BB6A' }}>file_upload</i>}
                                    label="Subir"
                                    onClick={this.onUpload}
                                    disabled={this.state.isLoading}
                                    labelColor="#66BB6A"
                                    className="btn-w-md"> </RaisedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    // auth: state.auth
    catalogs: state.catalogs,
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantAddRequest,
      catalogsGetRequest,
      participantUploadRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(File);

