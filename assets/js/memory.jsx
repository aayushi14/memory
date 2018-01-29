import React from 'react';
import ReactDOM from 'react-dom';

export default function run_memory(root) {
  let totalClicks = 0, opentile1: 15, opentile2: 15;
  ReactDOM.render(<Memory array = "" />, root);
}


class Memory extends React.Component {
  constructor(props) {
      super(props);
      this.state = {queArray: ['?','?','?','?','?','?','?','?','?','?','?','?','?','?','?','?'],
      totalClicks: 0,
      opentile1: 15,
      opentile2: 15,
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

    diffTiles(queArray, id1, id2) {
      let opentile1 = id1;
      let opentile2 = id2;
      let arr = queArray;
      arr[opentile1] = '?';
      arr[opentile2] = '?';
      this.setState({queArray: arr, opentile1:15, opentile2:15});
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

      if (opentile1 == 15 && opentile2 == 15) {
        this.setState({opentile1: id, queArray: arr});
      } else if (opentile1 != 15 && opentile2 == 15 && id!= opentile1) {
        opentile2 = id;
          if (queArray[opentile1] == queArray[opentile2]) {
            this.setState({opentile2: opentile2, queArray : queArray});
            this.setState({opentile1:15, opentile2:15});
          } else {
            this.setState({opentile2: opentile2});
            if (queArray[opentile1] != queArray[opentile2]) {
              setTimeout(this.diffTiles(queArray, opentile1, opentile2).bind(this), 2000);
            }
          }
        }

        let total = this.state.totalClicks;
        this.setState({totalClicks: total + 1});
      }

      hideTiles(n) {
        let queArray = this.state.queArray;
        let opentile1 = this.state.opentile1;
        let opentile2 = this.state.opentile2;
        let totalClicks = this.state.totalClicks;
        let loadedArray = this.state.loadedArray;
        this.setState({queArray: ['?','?','?','?','?','?','?','?','?','?','?','?','?','?','?','?']});
        this.setState({totalClicks: 0});
        this.setState({opentile1: 15});
        this.setState({opentile2: 15});
        if (n == 2) {
          this.setState({loadedArray: this.shuffleArray()});
        }
      }


/*  componentDidUpdate() {
    if(opentile1 != this.state.opentile2) {

    } else if (opentile2 != this.state.opentile2) {
      this. = c3.load({data: this.props.data});
      setTimeout(this.diffTiles(queArray, opentile1, opentile2).bind(this), 2000);
    }
  }*/

  render() {
    return (
      <div className="row">
        <div className="row grid">
          {this.state.queArray.map((letter, i) => <div className="tile"
          onClick={() => {this.showTile(i)}} key={"letter" + i} id={i}>
          <b>{letter}</b></div>)}
        </div>
        <div className="col-7">
          <div className="row">
            <p><b>Number of Clicks: </b></p>
            <p>{this.state.totalClicks}</p>
          </div>
          <div className="row">
            <button className="button" onClick={() => this.hideTiles(1)}>Replay Game</button>
          </div>
          <div className="row">
            <button className="button" onClick={() => this.hideTiles(2)}>New Game</button>
          </div>
        </div>
      </div>
    );
  }
}
