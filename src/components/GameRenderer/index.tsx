import React, { CanvasHTMLAttributes, MouseEvent, MouseEventHandler, SyntheticEvent } from 'react';
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
import { AppState } from '../../store';
import * as selectors from '../../store/selectors';
import { KeyboardEvent } from 'react-native';
import { Dispatch } from 'redux';

let delay = 500;
delay = 0;
const debounceA = debounce(delay);


interface GameRendererProps extends AppState {
  selectors: {
    charactersArray: ReturnType<typeof selectors.charactersArray>
    locationMapPosition: ReturnType<typeof selectors.locationMapPosition>
    mobsArray: ReturnType<typeof selectors.mobsArray>
    npcsArray: ReturnType<typeof selectors.npcsArray>
    dynamicCollisions: ReturnType<typeof selectors.dynamicCollisions>
    naiveDynamicCollisions: ReturnType<typeof selectors.naiveDynamicCollisions>
    locationObjects: ReturnType<typeof selectors.locationObjects>
    naiveCollisions: ReturnType<typeof selectors.naiveCollisions>
  }
  dispatch: Dispatch
  actions: any
}

interface GameRendererState {
  isLoaded: boolean
}


class GameRenderer extends React.Component<GameRendererProps, GameRendererState> {
  
  canvas: React.RefObject<any>
  ctx: null | CanvasRenderingContext2D
  locationImage: HTMLImageElement | null
  outfitImage: HTMLImageElement | null
  npcImage: HTMLImageElement | null
  location: any
  characters: any
  ownCharacter: any

  state = {
    isLoaded: false
  }

  constructor(props: Readonly<GameRendererProps>) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;

    this.locationImage = null;
    this.outfitImage = null;
    this.npcImage = null;

    this.location = null;
    this.characters = [];
    this.ownCharacter = null;
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');

    this.locationImage = new Image();
    this.locationImage.src = process.env.REACT_APP_LOCATION_IMG;
    this.locationImage.onload = () => this.setState({ isLoaded: true });
  }

  componentDidUpdate(prevProps: GameRendererProps, prevState: GameRendererState) {
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
      } as any);
      this.setupGame();
    }
  }

  setupGame = () => {
    const { x, y } = this.props.character.data;
    const { charWidth, charHeight } = this.props.game;
    const { charactersArray } = this.props.selectors;
    const { ctx } = this;

    this.location = new Location(this.ctx, {
      x, y,
      image: this.locationImage,
      charWidth,
      charHeight
    });

    this.characters = charactersArray.map(character => {
      const image = new Image();
      image.src = process.env[`REACT_APP_CHARACTER_IMG_${character.id}`];

      return new Character(this.ctx, {
        x: character.positionX,
        y: character.positionX,
        image,
        width: charWidth,
        height: charHeight
      } as any);
    });

    this.renderGame();
  }

  renderGame = () => {
    const { positionX: x, positionY: y } = this.props.character.data;
    const { charWidth, charHeight } = this.props.game;
    const { charactersArray } = this.props.selectors;
    const { width: gameWidth, height: gameHeight } = this.ctx.canvas;
    const {
      mapX, mapY, charPosX, charPosY,
      isXLocked, isYLocked
    } = this.props.selectors.locationMapPosition;
    const { npcsArray } = this.props.selectors;
    if (!this.ctx) return;

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

    for (let i = 0; i < charactersArray.length; i++) {
      const character = charactersArray[i];
      this.characters[i].render(character.positionX, character.positionY);
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

  handleMousePosition = (event: MouseEvent<HTMLCanvasElement>) => {
    event.persist();
    debounceA(() => {
      const { mapX, mapY } = this.props.selectors.locationMapPosition;
      const element = event.currentTarget as HTMLCanvasElement;
      const rect = element.getBoundingClientRect();
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
    });
  }

  handleMovement = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    const keyPressed: { [key: number]: string } = {
      87: 'w',
      65: 'a',
      83: 's',
      68: 'd'
    }[event.keyCode];

    let { x = 0, y = 0 } = this.props.character.data;

    switch(keyPressed) {
      case 'w':
        y--;
        break;
      case 'a':
        x--;
        break;
      case 's':
        y++;
        break;
      case 'd':
        x++;
        break;
      default: return;
    }

    this.props.dispatch({
      type: 'CHARACTER_UPDATE',
      payload: { x, y },
      meta: { keyPressed }
    });
  }

  handleMouseClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { mouseX, mouseY } = this.props.game;
    const { dynamicCollisions } = this.props.selectors;
    const { x = 0, y = 0 } = this.props.character.data || {};
    const { npcDialog } = this.props;

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

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.game.width}
        height={this.props.game.height}
        onMouseMove={this.handleMousePosition}
        onClick={this.handleMouseClick}
        style={{ position: 'relative' }}
      >
      </canvas>
    );
  }
}

const GameRendererWithStore = connect(
  (state: AppState) => ({
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