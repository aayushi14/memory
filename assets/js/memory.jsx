import React from 'react';
import ReactDOM from 'react-dom';

export default function game_init(root, channel) {
  let totalClicks = 0, opentile1: 16, opentile2: 16;
  ReactDOM.render(<Memory channel={channel} />, root);
}

class Memory extends React.Component {
  constructor(props) {
      super(props);
      this.channel = props.channel;
      this.state = { queArray: [],
        totalClicks: 0,
        opentile1: 16,
        opentile2: 16,
        matchedIndex: [],
        score: 0,
        disableClick: false,
        loadedArray: []};
      this.channel.join()
          .receive("ok", this.gotView.bind(this))
          .receive("error", resp => { console.log("Unable to join", resp) });
    }

    gotView(view) {
      this.setState(view.game);
    }

    resetState() {
      this.channel.push("doReset")
          .receive("ok", this.gotView.bind(this));
    }

    newGame() {
      this.channel.push("loadNew")
          .receive("ok", this.gotView.bind(this));
    }

    showTiles(id) {
      this.channel.push("showTile", {opentile: id})
          .receive("ok", this.gotView.bind(this));
    }

    differentTiles(queArray, opentile1, opentile2, disableClick) {
      this.channel.push("diffTiles", {queArray: queArray, opentile1:16, opentile2:16, disableClick: false})
          .receive("ok", this.gotView.bind(this));
    }

    componentDidUpdate() {
      let queArray = this.state.queArray;
      let opentile1 = this.state.opentile1;
      let opentile2 = this.state.opentile2;
      let disableClick = this.state.disableClick;

      if (opentile1 != 16 && opentile2 != 16 && queArray[opentile1] != queArray[opentile2]) {
        setTimeout(() => this.differentTiles(queArray, opentile1, opentile2, disableClick), 1000);
      }
    }

    render() {
      return (
        <div className="container main">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="row grid">
                {this.state.queArray.map((letter, i) => <button className="tile"
                onClick={() => {this.showTiles(i)}} key={"letter" + i} id={i}
                disabled={this.state.disableClick}>
                <b>{letter}</b></button>)}
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-6">
                  <p>Number of Clicks: {this.state.totalClicks}</p>
                </div>
                <div className="col-sm-6">
                  <p>Score: {this.state.score}/80</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-6">
                  <button className="button" onClick={() => {this.resetState();}}>Reset Game</button>
                </div>
                <div className="col-sm-6">
                  <button className="button" onClick={() => {this.resetState(); this.newGame();}}>New Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
