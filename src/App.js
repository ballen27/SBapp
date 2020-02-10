import React, { Component } from "react";
import "./App.css";
import Streams from "./components/Streams";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Bronson Test</p>
          <Streams />
        </header>
      </div>
    );
  }
}
export default App;
