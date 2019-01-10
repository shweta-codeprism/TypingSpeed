import * as React from 'react';
import './speedTracker.css';
import { connect } from 'react-redux';


type Props = {
  speed: number,
  mismatch: number,
};

const SpeedTracker  = (props: Props) => {
  const { speed, mismatch } = props;
  return (
    <div className="PropBlock">
      <span className="propsheader">TYPING SPEED</span>
      <div className="Tracker">
       <span className="currentWPM">{speed}</span>
       <span className="header">WPS</span>
       <hr className="speedDivider"/>
       <span className="currentMismatch"> {mismatch} </span>
       <span className="header"> Mismatch </span>
      </div>
      <span className="propsheader">ERRORS</span>
    </div>
  );
}

const mapStateToProps = state => ({
  speed: state.TypeProperties.speed,
  mismatch: state.TypeProperties.mismatch,
});


export default connect(
  mapStateToProps,
  null,
)(SpeedTracker);
