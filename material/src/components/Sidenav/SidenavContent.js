import React from 'react';
import { Link, hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { privilegesGetRequest, privilegesGetAllRequest } from '../../actions';


class SidebarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    }
  };
  componentWillMount() {
    // console.log("running component will mount");

    // API action
    this
      .props
      .actions
      .privilegesGetRequest().then(data => {
        this.setState({ permission: data.data });
      });
  };

  componentDidMount() {
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = hashHistory.getCurrentLocation();
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    hashHistory.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {

    // console.log('permission========', this.state.permission.pcatalogsEntry);
    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>
        <li className="nav-header"><span>Menu de Programa: </span></li>
        <li><FlatButton href="#/app/dashboard"><i className="nav-icon material-icons">home</i><span className="nav-text">Panel de control</span></FlatButton></li>
        <li><FlatButton href="#/app/program"><i className="nav-icon material-icons">assignment</i><span className="nav-text">Programas</span></FlatButton></li>
        {this.state.permission.pprogramActivation &&
        <li>
          <FlatButton href="#/app/activation"><i className="nav-icon material-icons">check_circle</i><span className="nav-text">Activar programa</span></FlatButton>
        </li>
        }
        <li><FlatButton href="#/app/clasification"><i className="nav-icon material-icons">grade</i><span className="nav-text">Clasificaciones</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/grade"><span>Grados</span></FlatButton>
              <ul>
                <li><FlatButton className="prepend-icon" href="#/app/grade"><span>Ver grados</span></FlatButton></li>
                <li><FlatButton className="prepend-icon" href="#/app/section"><span>Secciones</span></FlatButton></li>
              </ul>
            </li>
            <li><FlatButton className="prepend-icon" href="#/app/course"><span>Cursos</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/workshop"><span>Talleres</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/division"><span>Division</span></FlatButton></li>
          </ul>
        </li>
        <li><FlatButton href="#/app/students"><i className="nav-icon material-icons">supervisor_account</i><span className="nav-text">Participantes</span></FlatButton></li>
        <li><FlatButton href="#/app/teachers"><i className="nav-icon material-icons">school</i><span className="nav-text">Educadores</span></FlatButton></li>

        <li><FlatButton href="#/app/extra"><i className="nav-icon material-icons">remove_red_eye</i><span className="nav-text">Visualización</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/visualization/programs"><span>Vista de arbol</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/groups"><span className="nav-text">Todos los grupos</span></FlatButton></li>
          </ul>
        </li>

        <li><FlatButton href="#/app/clasification"><i className="nav-icon material-icons">insert_chart</i><span className="nav-text">Indicadores</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/indicators"><span>Por fundación</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/indicators"><span>Por programa</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/indicators"><span>Por grupo</span></FlatButton></li>
          </ul>
        </li>

        <li><FlatButton href="#/app/search"><i className="nav-icon material-icons">search</i><span className="nav-text">Buscar</span></FlatButton></li>

        <li className="nav-divider" />
        <li className="nav-header"><span>Menu de aplicación</span></li>

        <li><FlatButton href="#/app/category"><i className="nav-icon material-icons">list</i><span className="nav-text">Sistema</span></FlatButton>
          <ul>
            <li><FlatButton href="#/app/category"><i className="nav-icon material-icons">list</i><span className="nav-text">Categorias</span></FlatButton></li>
            {this.state.permission.pcatalogsEntry &&
            <li><FlatButton href="#/app/catalog"><i className="nav-icon material-icons">dashboard</i><span className="nav-text">Catalogos</span></FlatButton></li>
            }
          </ul>

        </li>
        <li><FlatButton href="#/app/locations"><i className="nav-icon material-icons">add_location</i><span className="nav-text">Sedes</span></FlatButton></li>
        <li><FlatButton href="#/app/privileges"><i className="nav-icon material-icons">pan_tool</i><span className="nav-text">Privilegios</span></FlatButton></li>
        <li><FlatButton href="#/app/users"><i className="nav-icon material-icons">perm_identity</i><span className="nav-text">Usuarios</span></FlatButton></li>

        <li className="nav-divider" />
        <li className="nav-header"><span>Menu de apoyo</span></li>
        <li className="li-small"><FlatButton href="#/app/page/faqs"><span className="nav-text">Preguntas frecuentes</span></FlatButton></li>
        <li className="li-small"><FlatButton href="#/app/page/terms"><span className="nav-text">Terminos y condiciones</span></FlatButton></li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return { permission: state.permission }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privilegesGetRequest,
      privilegesGetAllRequest
    }, dispatch)
  };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
