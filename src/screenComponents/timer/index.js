import * as React from 'react';
import { connect } from 'react-redux';
import { setSpeed } from 'reduxReducers/typeReducer';
import { timerCompleted } from 'reduxReducers/timerReducer';
import './timer.css';




type Props = {
  active: boolean,
  wordsTyped: number,
  setTheSpeed: (speed: number) => void,
};

type State = {
  minutes: string,
  seconds: string,
  activated: boolean,
  secondsRemaining: number,
}

class Timer extends React.Component<Props, State>{

  state = {
    minutes: '01',
    seconds: '00',
    activated: false,
    secondsRemaining: 60,
  };

  startTimer = () => {
    let { minutes, seconds, secondsRemaining } = this.state;
    let { setTheSpeed, resetTheTimer } = this.props;


    const timer = setInterval(()=>{
      if (secondsRemaining !== 0) {
        let { wordsTyped }= this.props;
        console.log(wordsTyped);
        secondsRemaining -= 1 ;
        const speed = Math.round(wordsTyped * 60 / (60 - secondsRemaining));
        setTheSpeed(speed);
        let c_minutes = Math.floor(secondsRemaining / 60);
        let c_seconds = secondsRemaining - (c_minutes * 60);
        if (parseInt(c_minutes, 10) < 10) {
          c_minutes = '0'+c_minutes;
        }

        if (parseInt(c_seconds, 10) < 10) {
          c_seconds = '0'+c_seconds;
        }
        this.setState({
          minutes: c_minutes,
          seconds: c_seconds,
          secondsRemaining,
        });
      } else {
        resetTheTimer();
        this.setState({
          minutes: '01',
          seconds: '00',
          secondsRemaining: 60,
          activated: false,
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  componentDidUpdate() {
    const { active } = this.props;
    const { activated } = this.state;
    if (active && !activated) {
      this.setState({
        activated: true,
      });
      this.startTimer();
    }
  }

  render() {
    const { active } = this.props;
    const { minutes, seconds } = this.state;
    return (
      <div className="PropBlock">
        <span className="propsheader"> TIME LEFT </span>
        <span className="Timer">
         {minutes}:{seconds}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.Timer.timerStarted,
  wordsTyped: state.TypeProperties.wordsTyped,
});

const mapDispatchToProps = dispatch => ({
  setTheSpeed: (speed: number) => dispatch(setSpeed(speed)),
  resetTheTimer: () => dispatch(timerCompleted()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);
