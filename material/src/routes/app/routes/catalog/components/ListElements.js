import React from "react";


class ListElements extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <article className="article">
        <h2 className="article-title">Lista de catalogos</h2>
        <div className="row">
          <div className="col-xl-6">
            <div className="box box-transparent">
              <div className="box-header no-padding-h">Basic table</div>
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Material</th>
                      <th>Quantity</th>
                      <th>Unit price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">1</td>
                      <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                      <td>25</td>
                      <td>$2.90</td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">2</td>
                      <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                      <td>50</td>
                      <td>$1.25</td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">3</td>
                      <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                      <td>10</td>
                      <td>$2.35</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="box box-transparent">
              <div className="box-header no-padding-h">Basic table</div>
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Material</th>
                      <th>Quantity</th>
                      <th>Unit price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">1</td>
                      <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                      <td>25</td>
                      <td>$2.90</td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">2</td>
                      <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                      <td>50</td>
                      <td>$1.25</td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">3</td>
                      <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                      <td>10</td>
                      <td>$2.35</td>
                    </tr>
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

module.exports = ListElements;
