import React from 'react';
import ReactDOM from 'react-dom';

export default function run_memory(root) {
  let totalClicks = 0, opentile1: 16, opentile2: 16;
  ReactDOM.render(<Memory />, root);
}


class Memory extends React.Component {
  constructor(props) {
      super(props);
      this.state = {queArray: ['?','?','?','?','?','?','?','?','?','?','?','?','?','?','?','?'],
      totalClicks: 0,
      opentile1: 16,
      opentile2: 16,
      matchedIndex: [],
      score: 0,
      disableClick: false,
      loadedArray: this.shuffleArray()}
    }

    shuffleArray() {
      let arr = ['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H'];
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      console.log(arr);
      return arr;
    }

    diffTiles(arr, opentile1, opentile2) {
      arr[opentile1] = '?';
      arr[opentile2] = '?';
      this.setState({queArray: arr, opentile1:16, opentile2:16, disableClick: false});
    }

    showTile(id) {
      let queArray = this.state.queArray;
      let opentile1 = this.state.opentile1;
      let opentile2 = this.state.opentile2;
      let matchedIndex = this.state.matchedIndex;
      let ansArray = this.state.loadedArray;
      let score = this.state.score;
      let total = this.state.totalClicks;

      let temp = ansArray[id];
      queArray[id] = temp;
      this.setState({queArray: queArray});

      if (opentile1 == 16 && opentile2 == 16 && !matchedIndex.includes(id)) {
        this.setState({queArray: queArray, opentile1: id, totalClicks: total + 1});
      } else if (opentile1 != 16 && opentile2 == 16 && id != opentile1 && !matchedIndex.includes(id)) {
        opentile2 = id;
          if (queArray[opentile1] == queArray[opentile2]) {
            matchedIndex.push(opentile1);
            matchedIndex.push(opentile2);
            this.setState({opentile2: opentile2, matchedIndex: matchedIndex});
            this.setState({queArray : queArray, opentile1:16, opentile2:16, score: score + 10, totalClicks: total + 1});
          } else {
            this.setState({opentile2: opentile2});
            if (queArray[opentile1] != queArray[opentile2]) {
              this.setState({disableClick: true, score: score - 5, totalClicks: total + 1});
              setTimeout(() => this.diffTiles(queArray, opentile1, opentile2), 1000);
            }
          }
        }
    }

    resetState() {
      let queArray = this.state.queArray;
      let opentile1 = this.state.opentile1;
      let opentile2 = this.state.opentile2;
      let totalClicks = this.state.totalClicks;
      this.setState({queArray: ['?','?','?','?','?','?','?','?','?','?','?','?','?','?','?','?']});
      this.setState({totalClicks: 0});
      this.setState({opentile1: 16});
      this.setState({opentile2: 16});
    }

    newGame() {
      let loadedArray = this.state.loadedArray;
      this.setState({loadedArray: this.shuffleArray()});
    }

  render() {
    return (
      <div className="container main">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="row grid">
              {this.state.queArray.map((letter, i) => <button className="tile"
              onClick={() => {this.showTile(i)}} key={"letter" + i} id={i}
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
                <button className="button" onClick={() => { this.resetState(); this.resetGame(); }}>Reset Game</button>
              </div>
              <div className="col-sm-6">
                <button className="button" onClick={() => { this.resetState(); this.newGame(); }}>New Game</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
