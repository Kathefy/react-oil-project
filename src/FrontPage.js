import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="page-header">
        <div className="container">
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
  // Change the class name for active slider
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
          <div className="footer-text">Dowiedz się więcej</div>
          <Link to="/charts">Kliknij tutaj</Link>
        </div>
      </div>
    );
  }
}

export class FrontPage extends Component {
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
