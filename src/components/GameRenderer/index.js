import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import { Location } from '../../engine/Location';
import { Character } from '../../engine/Character';
import { characters } from '../../store/selectors/location';

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
    this.characers = [];
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
    const { characters } = this.props.selectors;
    const { ctx } = this;

    this.location = new Location(this.ctx, {
      x, y,
      image: this.locationImage,
      charWidth,
      charHeight
    });

    this.characers = characters.map(character => {
      const image = new Image();
      image.src = process.env[`REACT_APP_CHARACTER_IMG_${character.id}`];

      return new Character(this.ctx, {
        x: character.positionX,
        y: character.positionX,
        image,
        width: charWidth,
        height: charHeight
      });
    });

    this.renderGame();
  }

  renderGame = () => {
    const { positionX: x, positionY: y } = this.props.character.data;
    const { charWidth, charHeight } = this.props.game;
    const posX = x * charWidth;
    const posY = y * charHeight;
    const { characters } = this.props.selectors;
    


    /* I - location */
    this.location.render(x, y);

    /* II - relative objects */
    this.ctx.save();
    this.ctx.translate(-posX, -posY);

    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      this.characers[i].render(character.positionX, character.positionY);
    }

    this.ctx.restore();

    /* III - absolute (own character) and camera */
    
    requestAnimationFrame(this.renderGame);
  }

  handleMovement = (event) => {
    const keyPressed = {
      87: 'w',
      65: 'a',
      83: 's',
      68: 'd'
    }[event.keyCode];

    let { positionX = 0, positionY = 0 } = this.props.characer.data;

    switch(keyPressed) {
      case 'w':
        positionY--;
        break;
      case 'a':
        positionX--;
        break;
      case 's':
        positionY++;
        break;
      case 'd':
        positionX++;
        break;
      default: return;
    }

    this.props.dispatch({
      type: 'CHARACTER_UPDATE',
      payload: { positionX, positionY },
      meta: { keyPressed }
    });
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
  (state) => ({
    ...state,
    selectors: {
      characters: characters(state)
    }
  }),
  mapDispatchToProps
)(GameRenderer);

export { GameRendererWithStore as GameRenderer };