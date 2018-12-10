import React, { Component } from "react";
import { Chart } from "react-google-charts";

export class Regions extends Component {
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
    this.setState({
      value: e.target.value,
      chartRegionData: chartRegionData
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
    let graph = null;
    if (this.state.countriesListChecked.length > 0) {
      graph = (
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
      );
    }
    return (
      <div className="sectors">
        <div className="container clearfix">
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
                      />
                      {item}
                    </label>
                  );
                })}
              </fieldset>
            </form>
          </div>
          {graph}
        </div>
      </div>
    );
  }
}
