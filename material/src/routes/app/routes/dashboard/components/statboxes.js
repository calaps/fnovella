import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const Statboxes = () => (
  <div className="row">
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>11</span>
        </div>
        <div className="box-info">
          <span>Programas activos</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">assignment</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>2<span className="size-h5">mil</span></span>
        </div>
        <div className="box-info">
          <span>Alumnos inscritos</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">supervisor_account</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>89<span className="size-h5"></span></span>
        </div>
        <div className="box-info">
          <span>Docentes activos</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">school</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>400<span className="size-h5"></span></span>
        </div>
        <div className="box-info">
          <span>Cantidad de cursos</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">library_books</i>
        </div>
      </div>
    </div>
  </div>
);

module.exports = Statboxes;
