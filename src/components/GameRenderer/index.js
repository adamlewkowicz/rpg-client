import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import { Location } from '../../engine/Location';
import { Character } from '../../engine/Character';
import {
  characters, locationMapPosition, mobsArray,
  npcsArray, dynamicCollisions, naiveDynamicCollisions,
  naiveCollisions, locationObjects
} from '../../store/selectors/location';
import { CHARACTER_WIDTH, CHARACTER_HEIGHT } from '../../store/consts';
import { isNearTo, debounce } from '../../utils';

let delay = 500;
delay = 0;
const debounceA = debounce(delay);

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
    this.outfitImage = null;

    this.location = null;
    this.characers = [];
    this.ownCharacter = null;
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');

    this.locationImage = new Image();
    this.locationImage.src = process.env.REACT_APP_LOCATION_IMG;
    this.locationImage.onload = () => this.setState({ isLoaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.game.status === 'LOADING' &&
      this.props.game.status === 'IDLE' &&
      this.props.character.data &&
      this.props.selectors.npcsArray.length &&
      this.state.isLoaded
    ) {
      const { positionX: x, positionY: y } = this.props.character.data;


      this.outfitImage = new Image();
      this.outfitImage.src = process.env[`REACT_APP_CHARACTER_IMG_${this.props.character.data.id}`];
      this.npcImage = new Image();
      this.npcImage.src = process.env.REACT_APP_NPC_IMG;

      this.ownCharacter = new Character(this.ctx, {
        x, y,
        image: this.outfitImage,
        gameWidth: this.props.game.width,
        gameHeight: this.props.game.height,
        locationWidth: this.props.location.width,
        locationHeight: this.props.location.height
      });
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
    const { characters } = this.props.selectors;
    const { width: gameWidth, height: gameHeight } = this.ctx.canvas;
    const {
      mapX, mapY, charPosX, charPosY,
      isXLocked, isYLocked
    } = this.props.selectors.locationMapPosition;
    const { npcsArray } = this.props.selectors;

    const posX = x * charWidth;
    const posY = y * charHeight;
    

    /* I - location */
    this.ctx.drawImage(this.locationImage,
      mapX, mapY,
      gameWidth, gameHeight,
      0, 0,
      gameWidth, gameHeight
    );
    
    // this.location.render(x, y);

    /* II - relative objects */
    this.ctx.save();
    this.ctx.translate(
      isXLocked ? 0 : -mapX,
      isYLocked ? 0 : -mapY
    );

    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      this.characers[i].render(character.positionX, character.positionY);
    }

    for (let npc of npcsArray) {
      this.ctx.drawImage(this.npcImage,
        0, 0,
        CHARACTER_WIDTH, CHARACTER_HEIGHT,
        npc.x * CHARACTER_WIDTH, npc.y * CHARACTER_HEIGHT,
        CHARACTER_WIDTH, CHARACTER_HEIGHT
      );
    }

    this.ctx.restore();

    /* III - absolute (own character) and camera */

    // this.ownCharacter.render(x, y);
    this.ctx.drawImage(this.outfitImage,
      0, 0,
      32, 48,
      charPosX, charPosY,
      32, 48
    );
    
    requestAnimationFrame(this.renderGame);
  }

  handleMousePosition = (event) => {
    const { mapX, mapY } = this.props.selectors.locationMapPosition;
    const rect = event.target.getBoundingClientRect();
    const xPixels = event.clientX - rect.left;
    const yPixels = event.clientY - rect.top;
  
    const mouseX = Math.floor((xPixels + mapX) / CHARACTER_WIDTH);
    const mouseY = Math.floor((yPixels + mapY) / CHARACTER_HEIGHT);
  
    if (
      mouseX !== this.props.game.mouseX ||
      mouseY !== this.props.game.mouseY
    ) {
      this.props.actions.mousePositionUpdate(mouseX, mouseY);
    }
  }

  handleMovement = (event) => {
    const keyPressed = {
      87: 'w',
      65: 'a',
      83: 's',
      68: 'd'
    }[event.keyCode];

    let { positionX = 0, positionY = 0 } = this.props.character.data;

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

  handleMouseClick = (event) => {
    const { mouseX, mouseY } = this.props.game;
    const { dynamicCollisions } = this.props.selectors;
    const { positionX: x, positionY: y } = this.props.character.data;
    const { npc: npcDialog } = this.props;

    const foundCollision = dynamicCollisions[mouseX][mouseY];

    if (npcDialog.opened) {
      return this.props.actions.npcDialogClose();
    }

    if (foundCollision && foundCollision.data) {
      const { x: collisionX, y: collisionY } = foundCollision.data;
      switch(foundCollision.type) {
        case 'NPC':
          if (isNearTo(x, y, collisionX, collisionY)) {
            this.props.actions.npcDialogOpen();
          }
      }
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.game.width}
        height={this.props.game.height}
        onMouseMove={(event) => {
          event.persist();
          debounceA(() => this.handleMousePosition(event));
        }}
        onClick={this.handleMouseClick}
        style={{ position: 'relative' }}
      >
      </canvas>
    );
  }
}

const GameRendererWithStore = connect(
  (state) => ({
    ...state,
    selectors: {
      characters: characters(state),
      locationMapPosition: locationMapPosition(state),
      mobsArray: mobsArray(state),
      npcsArray: npcsArray(state),
      dynamicCollisions: dynamicCollisions(state),
      naiveDynamicCollisions: naiveDynamicCollisions(state),
      locationObjects: locationObjects(state),
      naiveCollisions: naiveCollisions(state)
    }
  }),
  mapDispatchToProps
)(GameRenderer);

export { GameRendererWithStore as GameRenderer };