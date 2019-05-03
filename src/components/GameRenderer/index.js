import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import { Location } from '../../engine/Location';

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
}

class GameRenderer extends React.Component {
  
  state = {
    isLoaded: false
  }

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;

    this.locationImage = null;

    this.location = null;
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');

    this.locationImage = new Image();
    this.locationImage.src = process.env.REACT_APP_LOCATION_IMG;
    // this.locationImage.onload = () => this.setState({ isMapLoaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.game.status === 'LOADING' && this.props.game.status === 'IDLE') {
      this.setupGame();
    }
  }

  setupGame = () => {
    const { positionX: x, positionY: y } = this.props.character.data;
    const { charWidth, charHeight } = this.props.game;

    this.location = new Location(this.ctx, {
      x, y,
      image: this.locationImage,
      charWidth,
      charHeight
    });

    console.log(this.location)
    this.renderGame();
  }

  renderGame = () => {
    const { positionX: x, positionY: y } = this.props.character.data;
    // const { width: gameWidth, height: gameHeight } = this.props.game;

    this.location.render(x, y);
    
    requestAnimationFrame(this.renderGame);
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