import React, { Component, Fragment } from "react";
import "./App.scss";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { FrontPage } from "./FrontPage";
import { ChooseChart } from "./ChooseChart";
import { Sectors } from "./Sectors";
import { Regions } from "./Regions";
import { NotFound } from "./NotFound";

class NavigationGraphs extends Component {
  render() {
    return (
      <div className="main-page">
        <Link to="/">Strona Główna</Link>
        <Link to="/charts">Wróc</Link>
      </div>
    );
  }
}

class HeaderChart extends Component {
  render() {
    return (
      <header className="page-header">
        <div className="container">
          <NavigationGraphs />
          <h1>Popyt na ropę naftową</h1>
          <p>
            Popyt na ropę naftową rośnie codzienne. Uużywamy więcej ropy, niż
            odkrywamy, sięgamy po coraz trudniej dostępne zasoby. Ale na jak
            długo w tej sytuacji wystarczy nam ropy? I co będzie jak się
            skończy?...
          </p>
        </div>
      </header>
    );
  }
}

class FooterCharts extends Component {
  render() {
    return (
      <div className="footer-chart">
        <div className="container">
          <p>*Na podstawie danych statystycznych OPEC World Oil Outlook 2018</p>
        </div>
      </div>
    );
  }
}

class ChartSector extends Component {
  render() {
    return (
      <Fragment>
        <HeaderChart />
        <Sectors />
        <FooterCharts />
      </Fragment>
    );
  }
}

class ChartRegion extends Component {
  render() {
    return (
      <Fragment>
        <HeaderChart />
        <Regions />
        <FooterCharts />
      </Fragment>
    );
  }
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route path="/charts" component={ChooseChart} />
            <Route path="/sector" component={ChartSector} />
            <Route path="/region" component={ChartRegion} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
