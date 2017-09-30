import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
//import Customizer from 'components/Customizer'; // <Customizer />

class MainApp extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const { children, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav router={this.props.router}/>

        <section id="page-container" className="app-page-container">
          <Header router={this.props.router}/>

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                {children}
              </div>
            </div>

            <Footer />
          </div>
        </section>

      </div>
    );
  }
}

module.exports = MainApp;
