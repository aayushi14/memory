import React from 'react';
import ReactDOM from 'react-dom';

export default function run_memory(root) {
  let totalClicks = 0, opentile1: 16, opentile2: 16;
  ReactDOM.render(<Memory array = "" />, root);
}


class Memory extends React.Component {
  constructor(props) {
      super(props);
      this.state = {queArray: ['?','?','?','?','?','?','?','?','?','?','?','?','?','?','?','?'],
      totalClicks: 0,
      opentile1: 16,
      opentile2: 16,
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
      let ansArray = this.state.loadedArray;
      let temp1, temp2;
      let temp = ansArray[id];
      let arr = queArray;
      arr[id] = temp;
      this.setState({queArray: arr});

      if (opentile1 == 16 && opentile2 == 16) {
        this.setState({opentile1: id, queArray: arr});
      } else if (opentile1 != 16 && opentile2 == 16 && id != opentile1) {
        opentile2 = id;
          if (queArray[opentile1] == queArray[opentile2]) {
            this.setState({opentile2: opentile2, queArray : queArray});
            this.setState({opentile1:16, opentile2:16});
          } else {
            this.setState({opentile2: opentile2});
            if (queArray[opentile1] != queArray[opentile2]) {
              this.setState({disableClick: true});
              setTimeout(() => this.diffTiles(queArray, opentile1, opentile2), 1000);
            }
          }
        }

      let total = this.state.totalClicks;
      this.setState({totalClicks: total + 1});
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
      <div className="row main">
        <div className="row grid">
          {this.state.queArray.map((letter, i) => <button className="tile"
          onClick={() => {this.showTile(i)}} key={"letter" + i} id={i}
          disabled={this.state.disableClick}>
          <b>{letter}</b></button>)}
        </div>
        <div className="col-7">
          <div className="row">
            <p>Number of Clicks:</p>
            <p>{this.state.totalClicks}</p>
          </div>
          <div className="row">
            <button className="button" onClick={() => { this.resetState(); this.resetGame(); }}>Reset Game</button>
          </div>
          <div className="row">
            <button className="button" onClick={() => { this.resetState(); this.newGame(); }}>New Game</button>
          </div>
        </div>
      </div>
    );
  }
}
