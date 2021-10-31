import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import gsap from "gsap";
import qs from "qs";
import "./Map.scss";
import { UserContext, UserContextType } from '../../../Data/Context/UserContext/UserContextProvider';
import { WithContextHOC } from '../../HOC/WithContextHOC';
import { EventsContextType } from '../../../Data/Context/EventsContext/EventsContextProvider';

const campusPanningOffsetX: number = 300;
const campusPanningOffsetY: number = 400;

interface IProps {
  match: any;
  location: any;
  history: any;
  userContextData: UserContextType;
  eventsContextData: EventsContextType;
}

interface IState {
  positions: {[key: string]: any};

  campusOffsetX: number;
  campusOffsetY: number;

  offsetX: number;
  offsetY: number;

  deltaX: number,
  deltaY: number,
  mouseDown: boolean,
}

class Map extends Component<IProps, IState> {
  // static contextType = UserContext;
  canvasParentRef: any;
  canvasParent: any;

  canvasMapRef: any;
  canvasMap: any;
  ctx: any;

  images: {[key: string]: HTMLImageElement};

  campusWidth: number;
  campusHeight: number;

  needsResize: boolean;

  coordinates: any;
  eventColliders: any;

  animationLoop: any;

  constructor(props: IProps) {
    super(props);
    this.canvasParentRef = createRef();
    this.canvasMapRef = createRef();

    this.images = {};
    this.eventColliders = {};

    this.campusWidth = 900 * 1.2;
    this.campusHeight = 681 * 1.2;

    this.needsResize = false;
    this.animationLoop = null;

    this.coordinates = {
      latitude: 0,
      longitude: 0
    }

    this.state = {
      positions: {},

      campusOffsetX: 0,
      campusOffsetY: 0,

      offsetX: 0,
      offsetY: 0,

      deltaX: 0,
      deltaY: 0,
      mouseDown: false,

      //latitude: 0,
      //longitude: 0
    }
  }

  getLocationOfPlace = (place: string) => {
    const places: any = {
      "B Building": {
        x: 380,
        y: 310,
      },
      "C Building": {
        x: 290,
        y: 390,
      },
      "Green point": {
        x: 580,
        y: 310,
      },
      "Restaurant": {
        x: 760,
        y: 600,
      },
      "Audiovisuals": {
        x: 380,
        y: 110,
      },
    }
    return places[place];
  }

  loadImage = (imagePath: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image);
    image.src = imagePath;
  })

  getPosition = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          //console.log("latitude: ", this.state.latitude);
          //console.log("longitude: ", this.state.longitude);
          this.setState({
            //latitude: pos.coords.latitude, 
            //longitude: pos.coords.longitude
          })
        }, 
        (error) => {
          console.group(error);
        }, {
          enableHighAccuracy: true,
          maximumAge: 0
        });
    }
  }

  componentDidMount = async () => {
    if(this.props.userContextData[0] === null) {
      this.props.history.push('/login');
    } else {
      const {avatar} = this.props.userContextData[0];
    this.images["campus"] = await this.loadImage("/images/unisabana-map.png");
    this.images["avatar"] = await this.loadImage(`/images/${avatar.sexo}${avatar.skinColor}${avatar.hairColor}${avatar.hairStyle}.png`);
    this.images["location-icon"] = await this.loadImage("/images/Location_marker (1).png");

    this.canvasParent = this.canvasParentRef.current;

    this.canvasMap = this.canvasMapRef.current;
    window.addEventListener("resize", (e : any) => this.onResize(e));
    this.onResize(null);

    this.canvasMap.addEventListener("click", this.onClick);
    this.canvasMap.addEventListener("touchstart", this.onTouchStart);
    this.canvasMap.addEventListener("touchmove", this.onTouchMove);
    this.canvasMap.addEventListener("touchend", this.onTouchEnd);

    this.ctx = this.canvasMap.getContext("2d");
    
    const initialPositions: {[key: string]: any} = {};

    const { campusOffsetX, campusOffsetY } = this.state;
    initialPositions["campus"] = {x: campusOffsetX, y: campusOffsetY};
    initialPositions["avatar"] = {x: campusOffsetX + 460, y: campusOffsetY + 255};

    initialPositions["eventA"] = {x: campusOffsetX + 290, y: campusOffsetY + 335};
    initialPositions["eventB"] = {x: campusOffsetX + 560, y: campusOffsetY + 210};
    initialPositions["eventC"] = {x: campusOffsetX + 780, y: campusOffsetY + 130};

    this.eventColliders = {
      "eventA" : {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      "eventB" : {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      "eventC" : {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }

    this.setState({ positions: initialPositions });
    this.setPath();
    
    //this.centerAvatar()

    /*setInterval(() => {
      this.getPosition();
    }, 1000);*/

    this.centerEvent();

    window.requestAnimationFrame(this.update);
  }
  }

  setPath = () => {
    const timeline: any = gsap.timeline();

    timeline.to(this.coordinates, 
      {
        latitude: 80,
        longitude: 37,
        duration: 5,
        delay: 0
      },
      0
    )
  }

  onResize = (e : any) => {
    this.canvasMap.width = this.canvasParent.clientWidth;
    this.canvasMap.height = this.canvasParent.clientHeight;

    let campusOffsetX = this.canvasMap.width / 2 - this.campusWidth / 2;
    let campusOffsetY = this.canvasMap.height / 2 - this.campusHeight / 2;
    this.setState({ campusOffsetX, campusOffsetY })
  }

  centerEvent = () => {
    const { positions } = this.state;

    const parsedQuery = qs.parse(this.props.location.search.slice(1));

    if (parsedQuery?.location) {
      const { x, y } = this.getLocationOfPlace(parsedQuery.location as string);

      let offsetX = x - 530;
      let offsetY = y - 365;

      const offsetAnimation = {
        offsetXAcc: 0,
        offsetYAcc: 0,
      }

      let tempOffsetX = 0;
      let tempOffsetY = 0

      gsap.to(offsetAnimation, {
        offsetXAcc: offsetX,
        offsetYAcc: offsetY,
        duration: 1,
        delay: 0.25,
        ease: "power3.inOut",
        onUpdate: () => {
          const newPositions = { ...this.state.positions };
          Object.keys(newPositions).forEach(id => {
            newPositions[id].x -= offsetAnimation.offsetXAcc - tempOffsetX;
            newPositions[id].y -= offsetAnimation.offsetYAcc - tempOffsetY;
          })

          tempOffsetX = offsetAnimation.offsetXAcc;
          tempOffsetY = offsetAnimation.offsetYAcc;

          if (this.animationLoop) {
            this.setState({ positions: newPositions });
          }
        }
      })
    }
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
      this.state.positions["avatar"].x + this.coordinates.latitude + offsetX, 
      this.state.positions["avatar"].y + this.coordinates.longitude + offsetY, 
      this.images["avatar"].width * 0.35, 
      this.images["avatar"].height * 0.35
    );

    const eventBuildingsCounters: {[id: string]: any} = {}
    // Draw events
    this.props.eventsContextData[0].forEach(peopleEvent => {
      // console.dir(peopleEvent);
      const { id, name, place } = peopleEvent;
      const coordsPlace = this.getLocationOfPlace(place);
      let drawPin = false;
      if (eventBuildingsCounters[place] !== undefined) {
        eventBuildingsCounters[place]++;
      } else {
        drawPin = true;
        eventBuildingsCounters[place] = 0;
      }
      if (coordsPlace) {
        this.drawLocationPin(
          id.toString(),
          this.state.positions["campus"].x + coordsPlace.x + offsetX,
          this.state.positions["campus"].y + coordsPlace.y + offsetY - eventBuildingsCounters[place] * 50,
          110,
          45,
          name,
          drawPin,
        )
      }
    })

    this.animationLoop = window.requestAnimationFrame(this.update);
  }

  componentWillUnmount() {
    if(this.animationLoop) {
      window.cancelAnimationFrame(this.animationLoop);
      this.animationLoop = null;
    }
  }

  clear = () => {
    this.ctx.clearRect(-this.canvasMap.width *1000, -this.canvasMap.height *1000, this.canvasMap.width * 2000, this.canvasMap.height*2000);
  }

  drawImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    this.ctx.drawImage(image, x, y, width, height);
  }

  drawRect = (x: number, y: number, width: number, height: number) => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, y, x + width, y + height);
  }

  drawRoundRect = (x: number, y: number, width: number, height: number, radius: number, fillStyle: string) => {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();

    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();       
  }

  drawCollider = (x: number, y: number, width: number, height: number) => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
  }

  drawText = (x: number, y: number, fontSize: number, text: string) => {
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, x, y);
  }

  drawLocationPin = (key: string, x: number, y: number, rectWidth: number, rectHeight: number, label: string, drawPin: boolean = true) => {
    if (drawPin) {
      this.drawImage(
        this.images["location-icon"],
        x,
        y,
        this.images["location-icon"].width * 0.1, 
        this.images["location-icon"].height * 0.1
      )
    }

    const MAX_LABEL_LENGTH = 8;

    label = label.length > MAX_LABEL_LENGTH ? label.substring(0, MAX_LABEL_LENGTH) + "..." : label;

    let rectX = x - (rectWidth/2) + (this.images["location-icon"].width * 0.1)/2;
    let rectY = y - 50;

    this.drawRoundRect(
      rectX,
      rectY,
      rectWidth,
      rectHeight,
      8,
      "rgba(0, 0, 0, 0.65)"
    )

    this.drawText(
      rectX + (rectWidth/2),
      rectY + (rectHeight/2) + 2,
      20,
      label
    )

    // this.drawCollider(
    //   rectX,
    //   rectY,
    //   rectWidth,
    //   rectHeight,
    // );

    this.eventColliders[key] = {
      left: rectX,
      top: rectY,
      width: rectWidth,
      height: rectHeight,
    }
  }

  onClick = (e: any) => {
    let x = e.pageX;
    let y = e.pageY;

    Object.keys(this.eventColliders).forEach((colliderKey: any) => {
      const {left, top, width, height} = this.eventColliders[colliderKey];

      if(y > top && y < top + height && x > left && x < left + width) {
        console.log(`Clicked on collider ${colliderKey}`);

        this.props.history.push(`/events/${colliderKey}`);
      }
    })
  }

  getPos = (e: any) => { return {x: e.touches[0].pageX, y: e.touches[0].pageY} }

  onTouchStart = (e: any) => {
    //e?.stopPropagation();
    //e?.preventDefault();
    this.setState({ mouseDown: true })

    const {x, y} = this.getPos(e);

    this.setState({deltaX: x, deltaY: y});
  }

  onTouchMove = (e: any) => {
    e?.stopPropagation();
    e?.preventDefault();
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
    //e?.stopPropagation();
    //e?.preventDefault();
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

  callSOS = () => {
    this.props.history.push('/sos/create')
  }

  render() {
    return (
      <div id="canvas-parent" ref={this.canvasParentRef}>
        <canvas id="canvas-map" ref={this.canvasMapRef}/>
        <button className="sos-button" onClick={this.callSOS}>SOS</button>
      </div>
    );
  }
}

export default withRouter(WithContextHOC(Map));