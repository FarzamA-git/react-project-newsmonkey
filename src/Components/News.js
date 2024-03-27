import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews(this.state.page);
  }
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1
    });
  };
  // This is PAGINATION FUNCTIONALITY
  // handlePage = async (pageState) => {
  //   if (pageState === "Prev") {
  //     this.updateNews();
  //     this.setState({
  //       page: this.state.page - 1,
  //     });
  //   } else if (pageState === "Next") {
  //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //       this.updateNews();
  //       this.setState({
  //         page: this.state.page + 1,
  //       });
  //     }
  //   }
  // };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top News
        </h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-2">
              {/* {!this.state.loading && this.state.articles.map((element) => {PAGINATION CONDITION */}
              {this.state.articles.map((element,index) => {
                return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItems
                      key={`${element.url}-${index}`}
                      title={element.title}
                      description={element.description}
                      imageURL={element.urlToImage}
                      newsURL={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* This is PAGINATION */}
        {/* <div className="container d-flex justify-content-between">
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
        </div> */}
      </>
    );
  }
}

export default News;
