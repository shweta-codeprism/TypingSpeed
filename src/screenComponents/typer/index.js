import * as React from 'react';
import './typer.css';
import Text from './wordsToType';
import { connect } from 'react-redux';
import { setWordsNo, setMismatch, setSpeed } from 'reduxReducers/typeReducer';
import { startTimer } from 'reduxReducers/timerReducer';
import Results from 'screenComponents/results';



type Props = {
  wordsToType: string,
  setTheWordsNo: (wordsTyped: number) => void,
  setTheMismatch: (mismatch: number) => void,
  startTheTimer: (timerStarted: boolean) => void,
  mismatch: number,
  reset: boolean,
};

type State = {
  timerStarted: boolean,
  fixedWordsArray: Array<string>,
  wordsTyped: string,
  activeWordIndex: number,
  mismatchIndices: Array<number>,
  showResults: boolean,
  c_speed: number,
  c_mismatch: number,
}

class Typer extends React.Component<Props,State> {

  state = {
    startTime: 0,
    fixedWordsArray: [],
    wordsTyped: '',
    activeWordIndex: 0,
    mismatchIndices: [],
    showResults: false,
    c_speed: 0,
    c_mismatch: 0,
  };


  componentDidMount() {
    this.textInput.focus();
    this.textInput.addEventListener("mousedown", function(event){
      event.preventDefault();
    });
    this.textInput.addEventListener("keydown", function(event){
      if (event.keyCode === 37 || event.keyCode === 39) {
        event.preventDefault();
      }
    });
  }

  onTyping = (e, data) => {
    let { fixedWordsArray, startTime, mismatchIndices } = this.state;
    const { setTheWordsNo, setTheMismatch, mismatch, startTheTimer, wordsToType } = this.props;
    let mismatching = false;
    let currentWordsTyped = [];
    this.setState({
      wordsTyped: e.target.value,
    });

    if (e.target.value.length === 1) {
      console.log("Entered");
      startTheTimer(true);
      this.setState({
        showResults: false,
        c_speed: 0,
        c_mismatch: 0,
        fixedWordsArray: wordsToType.split(' '),
      });
    }

    if (e.target.value[e.target.value.length - 1] === ' ' || e.target.value.length === 0) {
      currentWordsTyped = e.target.value.split(' ');
      if (currentWordsTyped !== undefined && currentWordsTyped !== null && currentWordsTyped.length !== 0) {
        mismatchIndices = this.removeMismatch(currentWordsTyped.length - 1);
        setTheWordsNo(currentWordsTyped.length - 1);
        if ((currentWordsTyped[currentWordsTyped.length - 2] !== fixedWordsArray[currentWordsTyped.length - 2])
        && !mismatchIndices.includes(currentWordsTyped.length - 2)) {
          mismatching = true;
          mismatchIndices.push(currentWordsTyped.length - 2);
          setTheMismatch((mismatch + 1));
        }
        this.setState({
          activeWordIndex: currentWordsTyped.length - 1,
          mismatchIndices,
        });
      }
    }
  }

  removeMismatch = (wordsTyped) => {
    const { setTheMismatch, mismatch } = this.props;
    const { mismatchIndices } = this.state;
    let newMismatches = [];
    mismatchIndices.forEach(index => {

      if (index <= wordsTyped - 1) {
        newMismatches.push(index);
      } else {
        setTheMismatch(mismatch - 1);
      }
    });
    return newMismatches;
  }

  componentDidUpdate(){
    const { showResults } = this.state;
    const { reset, speed, mismatch, setTheWordsNo, setTheMismatch, setTheSpeed} = this.props;
    if (reset && !showResults) {
      this.setState({
        showResults: true,
        wordsTyped: '',
        activeWordIndex: 0,
        mismatchIndices: [],
        c_speed: speed,
        c_mismatch: mismatch,
      });
      setTheWordsNo(0);
      setTheSpeed(0);
      setTheMismatch(0);
    }
  }

  showtheResults = (speed, mismatch) => {
    return <Results speed={speed} mismatch={mismatch} />
  }

  render() {
    const { wordsToType } = this.props;
    const { wordsTyped, activeWordIndex, showResults, c_speed, c_mismatch  } = this.state;
    return (
      <div className="Block">
        <div className="Typer">
         <div style={{ height: '50%', overflowY: 'auto', padding: '5px'}}>
          <Text text={wordsToType.split(' ')} index={activeWordIndex}/>
         </div>
         <hr className="typeDiver"/>
         <div style={{ height: '50%', overflowY: 'auto', padding: '0px'}}>
          <textarea
            ref={(ta) => { this.textInput = ta; }}
            onClick={(e) => {e.preventDefault(); return false;}}
            placeholder="Type the above shown text here" className="typer" value={wordsTyped} onChange={this.onTyping} />
         </div>
        </div>
        {
          showResults ? <Results speed={c_speed} mismatch={c_mismatch} /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  speed: state.TypeProperties.speed,
  mismatch: state.TypeProperties.mismatch,
  reset: state.Timer.timerCompleted,
});

const mapDispatchToProps = dispatch => ({
  setTheSpeed: (speed: number) => dispatch(setSpeed(speed)),
  setTheWordsNo: (wordsTyped: number) => dispatch(setWordsNo(wordsTyped)),
  setTheMismatch: (mismatch: number) => dispatch(setMismatch(mismatch)),
  startTheTimer: (timerStarted: boolean) => dispatch(startTimer(timerStarted)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Typer);
