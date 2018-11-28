import React, { Component, Fragment } from "react";
import "./App.scss";
import { HashRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import { Chart } from "react-google-charts";

class Navigation extends Component {
  render() {
    return (
      <div className="main-page">
        <Link to="/">Strona Główna</Link>
      </div>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <header className="page-header">
        <div className="container">
          <div className="header">
            <h1>Popyt na ropę naftową</h1>
            <p>
              Popyt na ropę naftową rośnie codzienne. Uużywamy więcej ropy, niż
              odkrywamy, sięgamy po coraz trudniej dostępne zasoby. Ale na jak
              długo w tej sytuacji wystarczy nam ropy? I co będzie jak się
              skończy?...
            </p>
          </div>
        </div>
      </header>
    );
  }
}
class HeaderChart extends Component {
  render() {
    return (
      <header className="page-header">
        <div className="container">
          <Navigation />
          <div className="header">
            <h1>Popyt na ropę naftową</h1>
            <p>
              Popyt na ropę naftową rośnie codzienne. Uużywamy więcej ropy, niż
              odkrywamy, sięgamy po coraz trudniej dostępne zasoby. Ale na jak
              długo w tej sytuacji wystarczy nam ropy? I co będzie jak się
              skończy?...
            </p>
          </div>
        </div>
      </header>
    );
  }
}
class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      endDate: new Date(this.props.endDate),
      currentSlide: 0,
      classList: [
        "banner-slide banner-slide-active",
        "banner-slide",
        "banner-slide"
      ]
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
    this.slider = setInterval(() => {
      this.btnclickNext();
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.slider);
  }
  btnclickPrev = () => {
    let active = "banner-slide banner-slide-active";
    let classList = ["banner-slide", "banner-slide", "banner-slide"];
    let currentSlide = this.state.currentSlide;
    if (currentSlide === 0) {
      currentSlide = classList.length - 1;
    } else {
      currentSlide = currentSlide - 1;
    }
    classList[currentSlide] = active;
    this.setState({
      currentSlide: currentSlide,
      classList: classList
    });
  };
  btnclickNext = () => {
    let active = "banner-slide banner-slide-active";
    let classList = ["banner-slide", "banner-slide", "banner-slide"];
    let currentSlide = this.state.currentSlide;
    if (currentSlide === classList.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide = currentSlide + 1;
    }
    classList[currentSlide] = active;
    this.setState({
      currentSlide: currentSlide,
      classList: classList
    });
    console.log("hello");
  };
  render() {
    Date.daysBetween = function(date1, date2) {
      //Get 1 day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;
      // Convert both dates to milliseconds
      const date1Ms = date1.getTime();
      const date2Ms = date2.getTime();
      // Calculate the difference in milliseconds
      var differenceMs = date2Ms - date1Ms;
      // Convert back to days and return
      return Math.round(differenceMs / oneDay);
    };
    Date.monthsBetween = function(date1, date2) {
      const oneMonth = 1000 * 60 * 60 * 24 * 30;
      const date1Ms = date1.getTime();
      const date2Ms = date2.getTime();
      var differenceMs = date2Ms - date1Ms;
      return Math.round(differenceMs / oneMonth);
    };
    const elements = {
      div0:
        this.state.endDate.getFullYear() -
        this.state.date.getFullYear() +
        " lat",
      div1:
        Date.monthsBetween(this.state.date, this.state.endDate) + " miesięcy",
      div2: Date.daysBetween(this.state.date, this.state.endDate) + " dni"
    };
    return (
      <div className="main-banner">
        <div className="container">
          <div className="banner">
            <button className="banner-prev" onClick={this.btnclickPrev}>
              <i className="fa fa-angle-left" />
            </button>
            <button className="banner-next" onClick={this.btnclickNext}>
              <i className="fa fa-angle-right" />
            </button>
            <div className="banner-slides">
              {this.state.classList.map((item, index) => {
                return (
                  <div key={index} className={item}>
                    <p>
                      Światowe rezerwy ropy naftowey wynoszą{" "}
                      <span>1696.6 tys mln baryłek</span>
                    </p>
                    <p>
                      Biorąc pod uwagę dzienne uzycie ropy naftowey tych
                      rezerwów wystarczy na:
                    </p>
                    <div className="slider-number">
                      {elements[`div${index}`]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <p>
              Źródło: Obliczenia własne na podstawie danych statystycznych BP
              Statistical Review of World Energy 2018
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row-footer">
            <div className="footer-text">Dowiedz się więcej</div>
            <Link to="/charts">Kliknij tutaj</Link>
          </div>
        </div>
      </div>
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
    //console.log(sectorsListChecked);
    //Create data for the graphic
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
    console.log(chartSectorData);
    this.setState({
      sectorsListChecked: sectorsListChecked,
      chartSectorData: chartSectorData
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
                        // checked={this.state.sectorsChecked[index]}
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
class ChooseChart extends Component {
  render() {
    return (
      <div className="choose-chart-main">
        <div className="container">
          <Navigation />
          <div className="choose-chart">
            <div className="choose-chart-text">Wybierz wykres</div>
            <div className="choose-chart-links">
              <Link to="/sector">Sektor</Link>
              <Link to="/region">Region</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Watch endDate="March 12, 2068" />
        <Footer />
      </Fragment>
    );
  }
}

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
            <Route exact path="/" component={Main} />
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
