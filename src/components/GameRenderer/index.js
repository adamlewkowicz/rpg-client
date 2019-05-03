import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
}

class GameRenderer extends React.Component {
  
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;

    this.locationImage = null;
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');

    this.locationImage = new Image();
    this.locationImage.src = process.env.REACT_APP_LOCATION_IMG;
    this.locationImage.onload = this.draw;
  }

  draw = () => {

    this.ctx.drawImage(this.locationImage,
      0, 0,
      512, 512,
      0, 0,
      512, 512
    );
    
    requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.game.width}
        height={this.props.game.height}
      >
      </canvas>
    );
  }
}

const GameRendererWithStore = connect(
  (state) => state,
  mapDispatchToProps
)(GameRenderer);

export { GameRendererWithStore as GameRenderer };