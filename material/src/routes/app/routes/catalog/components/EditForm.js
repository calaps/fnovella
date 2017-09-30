import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object


class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    //local validation
    const { errors, isValid } = validateinput(this.state)
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      //we store  a function in the props
      this.props.userSignUpRequest(this.state).then(
        (response) => {
          //Save the default object as a provider
          this.context.router.history.push('/');
        },
        (error) => {
          console.log("An Error occur with the Rest API");
          this.setState({ errors: error.response.data, isLoading: false });
        });

    } else {
      console.log(this.state.errors);
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de campo</label>
                      <div className="col-md-9">
                        <input type="text" className="form-control" id="inputEmail3" placeholder="eje: altura" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          type="text"
                          name="timeZone"
                          onChange={this.onChange}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de dato</option>
                          {options}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Categoria que pertenece</label>
                      <div className="col-md-9">
                        <input type="text" className="form-control" id="inputEmail3" placeholder="eje: fisico" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-md-2 col-md-10">
                        <RaisedButton label="Agregar" secondary className="btn-w-md" />
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>
            <div className="col-xl-3">
            </div>
          </div>

        </div>
      </article>
    );
  }
}

module.exports = EditForm;
