import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export class App extends Component {
apiKey=process.env.REACT_APP_NEWS_API_KEY;
state={
  progress:0
}

setProgressState=(progress)=>{
  this.setState({progress:progress});
}

  pageSize=9;
  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar color='#f11946' height={2.5} progress={this.state.progress}/>          
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgressState} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={this.setProgressState}apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business" />}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgressState} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />}/>
          <Route exact path="/health" element={<News setProgress={this.setProgressState} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health" />}/>
          <Route exact path="/science" element={<News setProgress={this.setProgressState} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="us" category="science" />}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgressState} apiKey={this.apiKey}  key="sports" pageSize={this.pageSize} country="us" category="sports" />}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgressState} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology" />}/>
        </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
