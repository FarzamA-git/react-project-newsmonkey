import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps={
      country:'us',
      pageSize:9,
      category:'general'
  }
  static propTypes={
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d1e36ee6974df5bd122395541e9283&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  handlePage = async (pageState) => {
    if (pageState === "Prev") {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d1e36ee6974df5bd122395541e9283&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading:false
      });
    } else if (pageState === "Next") {
      if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d1e36ee6974df5bd122395541e9283&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: parsedData.articles,
          page: this.state.page + 1,
          loading:false
        });
      }
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="d-flex justify-content-center my-5">NewsMonkey - Top News</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imageURL={element.urlToImage}
                  newsURL={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page < 1}
            type="button"
            onClick={() => this.handlePage("Prev")}
            className="btn btn-dark"
          >
            Previous
          </button>
          <button
            type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={() => this.handlePage("Next")}
            className="btn btn-dark"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
