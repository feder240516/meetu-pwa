import React, { Component, createRef } from 'react';
import "./Map.scss";

const campusPanningOffsetX: number = 300;
const campusPanningOffsetY: number = 400;

interface IProps {
}

interface IState {
  positions: {[key: string]: any};

  campusOffsetX: number;
  campusOffsetY: number;

  offsetX: number;
  offsetY: number;

  deltaX: number,
  deltaY: number,
  mouseDown: boolean
}

class Map extends Component<IProps, IState> {
  canvasParentRef: any;
  canvasParent: any;

  canvasMapRef: any;
  canvasMap: any;
  ctx: any;

  images: {[key: string]: HTMLImageElement};

  campusWidth: number;
  campusHeight: number;

  needsResize: boolean;

  constructor(props: IProps) {
    super(props);
    this.canvasParentRef = createRef();
    this.canvasMapRef = createRef();

    this.images = {};

    this.campusWidth = 900 * 1.2;
    this.campusHeight = 681 * 1.2;

    this.needsResize = false;

    this.state = {
      positions: {},

      campusOffsetX: 0,
      campusOffsetY: 0,

      offsetX: 0,
      offsetY: 0,

      deltaX: 0,
      deltaY: 0,
      mouseDown: false
    }
  }

  loadImage = (imagePath: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image);
    image.src = imagePath;
  })

  componentDidMount = async () => {
    this.images["campus"] = await this.loadImage("/images/unisabana-map.png");
    this.images["avatar"] = await this.loadImage("/images/avatar.png");

    this.canvasParent = this.canvasParentRef.current;

    this.canvasMap = this.canvasMapRef.current;
    window.addEventListener("resize", (e : any) => this.onResize(e));
    this.onResize(null);

    this.canvasMap.addEventListener("touchstart", this.onTouchStart);
    this.canvasMap.addEventListener("touchmove", this.onTouchMove);
    this.canvasMap.addEventListener("touchend", this.onTouchEnd);

    this.ctx = this.canvasMap.getContext("2d");
    
    const initialPositions: {[key: string]: any} = {};

    const { campusOffsetX, campusOffsetY } = this.state;
    initialPositions["campus"] = {x: campusOffsetX, y: campusOffsetY};
    initialPositions["avatar"] = {x: 130, y: 0};

    this.setState({ positions: initialPositions });

    this.centerAvatar()

    window.requestAnimationFrame(this.update);
  }

  onResize = (e : any) => {
    this.canvasMap.width = this.canvasParent.clientWidth;
    this.canvasMap.height = this.canvasParent.clientHeight;

    let campusOffsetX = this.canvasMap.width / 2 - this.campusWidth / 2;
    let campusOffsetY = this.canvasMap.height / 2 - this.campusHeight / 2;
    this.setState({ campusOffsetX, campusOffsetY })
  }

  centerAvatar = () => {
    const { positions } = this.state;
    const {x, y} = positions["avatar"];

    let offsetX = x - this.canvasMap.width / 2 + (this.images["avatar"].width* 0.65) / 2;
    let offsetY = y - this.canvasMap.height / 2 + (this.images["avatar"].height* 0.65) / 2;

    const newPositions = {...this.state.positions};
    Object.keys(newPositions).forEach(id => {
      newPositions[id].x -= offsetX;
      newPositions[id].y -= offsetY;
    })

    this.setState({ positions: newPositions });
  }

  update = () => {
    const { positions, offsetX, offsetY } = this.state;

    this.clear();

    // Draw campus
    this.drawImage(
      this.images["campus"], 
      positions["campus"].x + offsetX, 
      positions["campus"].y + offsetY, 
      this.campusWidth, 
      this.campusHeight
    );

    // Draw avatar
    this.drawImage(
      this.images["avatar"], 
      positions["avatar"].x + offsetX, 
      positions["avatar"].y + offsetY, 
      this.images["avatar"].width * 0.65, 
      this.images["avatar"].height * 0.65
    );

    window.requestAnimationFrame(this.update);
  }

  clear = () => {
    this.ctx.clearRect(-this.canvasMap.width *1000, -this.canvasMap.height *1000, this.canvasMap.width * 2000, this.canvasMap.height*2000);
  }

  drawImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    this.ctx.drawImage(image, x, y, width, height);
  }

  getPos = (e: any) => { return {x: e.touches[0].pageX, y: e.touches[0].pageY} }

  onTouchStart = (e: any) => {
    this.setState({ mouseDown: true })

    const {x, y} = this.getPos(e);
    this.setState({deltaX: x, deltaY: y});
  }

  onTouchMove = (e: any) => {
    if(this.state.mouseDown) {
      const {x, y} = this.getPos(e);

      let newOffsetX =  x - this.state.deltaX;
      let newOffsetY = y - this.state.deltaY;

      const newPosX =  -(this.state.positions["campus"].x + this.state.offsetX + newOffsetX);
      const newPosY = -(this.state.positions["campus"].y + this.state.offsetY + newOffsetY);

      const leftLimit = this.state.campusOffsetX;
      const rightLimit = - this.state.campusOffsetX;

      const topLimit = this.state.campusOffsetY;
      const bottomLimit = - this.state.campusOffsetY;

      if(newPosX + this.state.campusOffsetX >= leftLimit - campusPanningOffsetX
        && newPosX + this.state.campusOffsetX <= rightLimit + campusPanningOffsetX) {
          this.setState({offsetX: newOffsetX});
      }

      if(newPosY + this.state.campusOffsetY >= topLimit - campusPanningOffsetY
        && newPosY + this.state.campusOffsetY <= bottomLimit + campusPanningOffsetY) {
          this.setState({offsetY: newOffsetY});
      }

      // Old way
      /*this.setState({
        offsetX: newOffsetX, 
        offsetY: newOffsetY,
      });*/
    }
  } 

  onTouchEnd = (e: any) => {
    if(this.state.mouseDown) {
      this.setState({mouseDown: false});
    
      const newPositions = {...this.state.positions};
      Object.keys(newPositions).forEach(id => {
        newPositions[id].x += this.state.offsetX;
        newPositions[id].y += this.state.offsetY;
      })

      this.setState({ positions: newPositions });
      this.setState({offsetX: 0, offsetY: 0});
    }
  }

  render() {
    return (
      <div id="canvas-parent" ref={this.canvasParentRef}>
        <canvas id="canvas-map" ref={this.canvasMapRef}/>
      </div>
    );
  }
}

export default Map;