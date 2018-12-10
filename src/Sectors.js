import React, { Component } from "react";
import { Chart } from "react-google-charts";

export class Sectors extends Component {
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
    if (this.state.sectorsListChecked.length > 0) {
      graph = (
        <div className="chart">
          <Chart
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
      );
    }
    return (
      <div className="sectors">
        <div className="container clearfix">
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
          {graph}
        </div>
      </div>
    );
  }
}
