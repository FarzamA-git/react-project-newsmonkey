import React, { Component } from "react";
export class NewsItems extends Component {
  render() {
    let {title,description,imageURL,newsURL}=this.props;
    return (
      <div className="mb-3">
      <div className="card" style={{width: '18rem'}} >
        <img src={!imageURL?"https://img.icons8.com/dusk/64/000000/no-image.png":imageURL} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <a href={newsURL} className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
      </div>
    );
  }
}

export default NewsItems;
