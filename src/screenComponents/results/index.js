import * as React from 'react';
import './results.css';
import { connect } from 'react-redux';


type Props = {
  speed: number,
  mismatch: number,
};

const Results  = (props: Props) => {
  const { speed, mismatch } = props;
  return (
    <div className="Results">
      <div className="EachResult">
        <span className="header">Typing Speed</span>
        <span className="contentWPM">{speed}</span>
        <span className="header">WPM</span>
      </div>
      <div className="ResultDiv"/>
      <div className="EachResult">
        <span className="header">Errors</span>
        <span className="contentMismatch">{mismatch}</span>
        <span className="header">Mistyped</span>
      </div>
      <div className="ResultDiv"/>
      <div className="EachResult">
        <span className="header">Effective</span>
        <span className="contentEffective"> {speed - mismatch}</span>
        <span className="header">WPM</span>
      </div>
    </div>
  );
}



export default Results;
