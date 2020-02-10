import React, { Component } from "react";
class Streams extends Component {
  state = {
    data: "",
    twitchurl: "",
    twitchInput: "",
    mixerurl: "",
    mixerInput: ""
  };

  _formatThumbnail = thumbnail => {
    const widthUrl = thumbnail.replace("{width}", 400);
    const formattedUrl = widthUrl.replace("{height}", 200);
    this.setState({ twitchurl: formattedUrl });
  };
  _getTwitchStreams = e => {
    e.preventDefault();
    fetch(
      `https://api.twitch.tv/helix/streams?first=5&user_login=${this.state.twitchInput}`,
      {
        method: "GET",
        headers: {
          "Client-ID": "q4a4v5p2h4f78krp3cc088wln1u54j",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.text())
      .then(result => {
        const parsedResult = JSON.parse(result);
        this.setState({ data: result });
        this._formatThumbnail(parsedResult.data[0].thumbnail_url);

        console.log(parsedResult.data[0]);
      })
      .catch(error => console.log("ERROR: ", error));
  };

  _getMixerStreams = e => {
    e.preventDefault();
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(
      `https://mixer.com/api/v1/channels/${this.state.mixerInput}`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        const parsedResult = JSON.parse(result);
        console.log(parsedResult);
        this.setState({ mixerurl: parsedResult.bannerUrl });
      })
      .catch(error => console.log("error", error));
  };

  _handleMixerInput = e => {
    this.setState({ mixerInput: e.target.value });
    console.log(this.state.mixerInput);
  };
  _handleTwitchInput = e => {
    this.setState({ twitchInput: e.target.value });
    console.log(this.state.twitchInput);
  };

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={e => this._getTwitchStreams(e)}>
            <input
              type="text"
              onChange={e => this._handleTwitchInput(e)}
            ></input>
          </form>
          <button type="submit"> get twitch streams </button>
          <form onSubmit={e => this._getMixerStreams(e)}>
            <input
              type="text"
              onChange={e => this._handleMixerInput(e)}
            ></input>
          </form>
          <button type="submit"> get mixer streams </button>
          <img alt={"thumbnail"} src={this.state.twitchurl} />
          <img
            alt={"thumbnail"}
            src={this.state.mixerurl}
            height={200}
            width={400}
          />
        </div>
      </div>
    );
  }
}
export default Streams;
