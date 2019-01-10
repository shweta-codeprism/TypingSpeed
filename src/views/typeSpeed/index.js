import * as React from 'react';
import './typeSpeed.css';
import SpeedTracker from 'screenComponents/speedTracker';
import Typer from 'screenComponents/typer';
import Timer from 'screenComponents/timer';
import { connect } from 'react-redux';
import { getText } from 'assets/apis/apiUtilCall';


type Props = {
  speed: number,
  misTypedWords: number,
};

type State = {
  wordsToType: string,
}

class TypeSpeed extends React.Component<Props,State> {
  state = {
    wordsToType: '',
  }

  componentDidMount() {
    getText().then(response => {
      if (response.hasOwnProperty('text')) {
        this.setState({
          wordsToType: response.text,
        });
      }
    });
  }

  render () {
    const { wordsToType } = this.state;

    return (
      <div className="TypeSpeedSetup">
       <Typer wordsToType={wordsToType}/>
        <div className="PropsSetup">
          <Timer />
          <br />
          <br />
          <SpeedTracker />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypeSpeed);
