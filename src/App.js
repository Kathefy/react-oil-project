import React, { Component, Fragment } from "react";
import "./App.scss";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { Chart } from "react-google-charts";
import { FrontPage } from "./FrontPage";
import { ChooseChart } from "./ChooseChart";

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

class Sectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectorsListChecked: [],
      data: [],
      regions: [],
      sectors: [],
      years: [],
      value: "World",
      chartSectorData: []
    };
  }
  countryChange = e => {
    const table = ["Year", ...this.state.sectorsListChecked];
    const newTableyear = this.state.years.map((item, index) => {
      let itemOne = [];
      itemOne.push(item);

      const data = this.state.data
        .filter(element => element.year === item)
        .filter(element => e.target.value.indexOf(element.region) > -1);

      this.state.sectorsListChecked.forEach(sector => {
        let resultFilter = data.filter(element => element.sector === sector);
        itemOne.push(resultFilter[0].number);
      });

      return itemOne;
    });
    const chartSectorData = [table, ...newTableyear];
    this.setState({
      value: e.target.value,
      chartSectorData: chartSectorData
    });
  };
  sectorChange = (e, index) => {
    let sectorsListChecked = this.state.sectorsListChecked;
    if (sectorsListChecked.indexOf(e.target.value) === -1) {
      sectorsListChecked.push(e.target.value);
    } else {
      let deleteSector = sectorsListChecked.indexOf(e.target.value);
      sectorsListChecked.splice(deleteSector, 1);
    }
    //Filter data for the graphics
    const table = ["Year", ...sectorsListChecked];
    const newTableyear = this.state.years.map((item, index) => {
      let itemOne = [];
      itemOne.push(item);

      const data = this.state.data
        .filter(element => element.year === item)
        .filter(element => this.state.value.indexOf(element.region) > -1);

      sectorsListChecked.forEach(sector => {
        let resultFilter = data.filter(element => element.sector === sector);
        itemOne.push(resultFilter[0].number);
      });

      return itemOne;
    });
    const chartSectorData = [table, ...newTableyear];
    //console.log(chartSectorData);
    this.setState({
      sectorsListChecked: sectorsListChecked,
      chartSectorData: chartSectorData
    });
  };
  // Get data from the server
  componentDidMount() {
    fetch("db.json")
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(data => {
        //console.log("Info:", data);
        // Create the list of sectors and regions
        let sectors = [];
        let regions = [];
        let years = [];
        data.oil.forEach(function(element) {
          if (sectors.indexOf(element.sector) === -1) {
            sectors.push(element.sector);
          }
          if (regions.indexOf(element.region) === -1) {
            regions.push(element.region);
          }
          if (years.indexOf(element.year) === -1) {
            years.push(element.year);
          }
        });
        // console.log(sectors);
        // console.log(regions);
        // console.log(years);

        this.setState({
          data: data.oil,
          sectors: sectors,
          regions: regions,
          years: years
        });
      })
      .catch(err => {
        console.log("Błąd!", err);
      });
  }
  render() {
    return (
      <div className="sectors">
        <div className="container sectors-forms">
          <div className="forms">
            <form>
              <fieldset>
                <legend>Wybierz region:</legend>
                <select value={this.state.value} onChange={this.countryChange}>
                  {this.state.regions.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend>Wybierz sektor:</legend>
                {this.state.sectors.map((item, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={item}
                        onChange={e => this.sectorChange(e, index)}
                      />
                      {item}
                    </label>
                  );
                })}
              </fieldset>
            </form>
          </div>
          <div className="chart">
            <Chart
              width={"600px"}
              height={"400px"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={this.state.chartSectorData}
              options={{
                chart: {
                  title: `Popyt na ropę naftową, region: ${
                    this.state.value
                  }, sektory: ${this.state.sectorsListChecked}`,
                  subtitle: "Milion baryłek dzienne"
                }
              }}
              rootProps={{ "data-testid": "3" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
class Regions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesListChecked: [],
      data: [],
      regions: [],
      sectors: [],
      years: [],
      value: "Road transportation",
      chartRegionData: []
    };
  }
  countryChange = (e, index) => {
    let countriesListChecked = this.state.countriesListChecked;
    if (countriesListChecked.indexOf(e.target.value) === -1) {
      countriesListChecked.push(e.target.value);
    } else {
      let deleteCountry = countriesListChecked.indexOf(e.target.value);
      countriesListChecked.splice(deleteCountry, 1);
    }
    const table = ["Year", ...countriesListChecked];
    const newTableyear = this.state.years.map((item, index) => {
      let itemOne = [];
      itemOne.push(item);

      const data = this.state.data
        .filter(element => element.year === item)
        .filter(element => this.state.value.indexOf(element.sector) > -1);
      countriesListChecked.forEach(region => {
        let resultFilter = data.filter(element => element.region === region);
        itemOne.push(resultFilter[0].number);
      });

      return itemOne;
    });
    const chartRegionData = [table, ...newTableyear];
    console.log(chartRegionData);
    this.setState({
      countriesListChecked: countriesListChecked,
      chartRegionData: chartRegionData
    });
  };
  sectorChange = e => {
    const table = ["Year", ...this.state.countriesListChecked];
    const newTableyear = this.state.years.map((item, index) => {
      let itemOne = [];
      itemOne.push(item);

      const data = this.state.data
        .filter(element => element.year === item)
        .filter(element => e.target.value.indexOf(element.sector) > -1);
      this.state.countriesListChecked.forEach(region => {
        let resultFilter = data.filter(element => element.region === region);
        itemOne.push(resultFilter[0].number);
      });

      return itemOne;
    });
    const chartRegionData = [table, ...newTableyear];
    console.log(chartRegionData);
    this.setState({
      value: e.target.value,
      chartRegionData: chartRegionData
    });
  };
  // Pobieramy dane z serwera
  componentDidMount() {
    fetch("db.json")
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(data => {
        console.log("Info:", data);
        // Create the list of sectors and regions
        let sectors = [];
        let regions = [];
        let years = [];
        data.oil.forEach(function(element) {
          if (sectors.indexOf(element.sector) === -1) {
            sectors.push(element.sector);
          }
          if (regions.indexOf(element.region) === -1) {
            regions.push(element.region);
          }
          if (years.indexOf(element.year) === -1) {
            years.push(element.year);
          }
        });
        console.log(sectors);
        console.log(regions);
        console.log(years);
        this.setState({
          data: data.oil,
          sectors: sectors,
          regions: regions,
          years: years
        });
      })
      .catch(err => {
        console.log("Błąd!", err);
      });
  }
  render() {
    return (
      <div className="sectors">
        <div className="container sectors-forms">
          <div className="forms">
            <form>
              <fieldset>
                <legend>Wybierz sektor:</legend>
                <select value={this.state.value} onChange={this.sectorChange}>
                  {this.state.sectors.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend>Wybierz region:</legend>
                {this.state.regions.map((item, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={item}
                        onChange={e => this.countryChange(e, index)}
                        // checked={this.state.countriesChecked[index]}
                      />
                      {item}
                    </label>
                  );
                })}
              </fieldset>
            </form>
          </div>
          <div className="chart">
            <Chart
              width={"600px"}
              height={"400px"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={this.state.chartRegionData}
              options={{
                chart: {
                  title: `Popyt na ropę naftową, kraje: ${
                    this.state.countriesListChecked
                  }, sektory: ${this.state.value}`,
                  subtitle: "Milion baryłek dzienne"
                }
              }}
              rootProps={{ "data-testid": "3" }}
            />
          </div>
        </div>
      </div>
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
// class ChooseChart extends Component {
//   render() {
//     return (
//       <div className="choose-chart-main">
//         <div className="container">
//           <Navigation />
//           <div className="choose-chart">
//             <div className="choose-chart-text">Wybierz wykres</div>
//             <div className="choose-chart-links">
//               <Link to="/sector">Sektor</Link>
//               <Link to="/region">Region</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

class NotFound extends Component {
  render() {
    return <HeaderChart />;
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
