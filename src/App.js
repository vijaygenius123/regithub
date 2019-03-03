import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import Header from "./components/common/header";
import UserForm from "./components/user-form";
import UserInfo from "./components/user-info";
import Repositories from "./components/repositories";

export const DataContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, loading: false };
  }

  onUserChange = ({ username }) => {
    this.setState({ data: {}, loading: true });
    axios
      .get(`https://github-user.now.sh/?username=${username}`)
      .then(response => this.setState({ data: response.data, loading: false }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <UserForm onUserChange={this.onUserChange} />

        {this.state.loading ? (
          <div className="message">fetching data...</div>
        ) : null}

        {this.state.data.repos ? (
          <div>
            <UserInfo data={this.state.data} />
            <Repositories repos={this.state.data.repos} />
          </div>
        ) : null}
      </div>
    );
  }
}

function App2() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  React.useEffect(function() {
    onUserChange({ username: "facebook" });
  }, []);

  function onUserChange({ username }) {
    setLoading(true);
    setData({});
    axios
      .get(`https://github-user.now.sh/?username=${username}`)
      .then(response => {
        setLoading(false);
        setData(response.data);
      });
  }

  return (
    <DataContext.Provider value={data}>
      <div className="App">
        <Header />
        <UserForm onUserChange={onUserChange} />

        {loading ? <div className="message">fetching data...</div> : null}

        {data.repos ? (
          <div>
            <UserInfo data={data} />
            <Repositories repos={data.repos} />
          </div>
        ) : null}
      </div>
    </DataContext.Provider>
  );
}

export default App2;
