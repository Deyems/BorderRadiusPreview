
class BorderRadiusFinder{
  constructor(){
    this.top = document.querySelector('.topdot');
    this.right = document.querySelector('.rightdot');
    this.bottom = document.querySelector('.bottomdot');
    this.left = document.querySelector('.leftdot');
    this.circle = document.querySelector('.circle');
    this.circleEdges = document.querySelector('.circle-bdr');
    this.resultOfleftTop = document.querySelectorAll('.top-left');
    this.resultOfBottomleft = document.querySelectorAll('.bottom-left');
    this.resultOfrightTop = document.querySelectorAll('.top-right');
    this.resultOfBottomright = document.querySelectorAll('.bottom-right');
    // this.clipBrd = document.querySelector('.copy-tool');
    this.width = document.querySelector('#width');
    this.height = document.querySelector('#height');
    this.adjustControls = document.querySelector('.adjustControl');

    this.boundary = this.circleEdges.getBoundingClientRect();

    this.xAxis = {
      "topright": this.boundary.right,
      "topleft" : this.boundary.x,
      "bottomright": this.boundary.right,
      "bottomleft": this.boundary.x,
      "midpoint": (this.boundary.x + this.boundary.right)/2
    }

    this.yAxis = {
      "topleft": this.boundary.y,
      "bottomleft": this.boundary.y + this.boundary.height,
      "topright": this.boundary.y,
      "bottomright": this.boundary.y + this.boundary.height,
      "midpoint" : (this.boundary.y*2 + this.boundary.height)/2
    }
  }

  run(){
    //LISTEN FOR EVENTS

    this.top.addEventListener('mousedown', (e) => {
      console.log('top working');
        if(e.button == 0){
          window.addEventListener("mousemove",this.moveTop);
        }
        e.preventDefault();
      });

    this.left.addEventListener('mousedown', (e) => {
    console.log('left working');
      if(e.button == 0){
        window.addEventListener("mousemove",this.moveLeft);
      }
      e.preventDefault();
    });

    this.bottom.addEventListener('mousedown', (e) => {
    console.log('bottom working');
      if(e.button == 0){
        window.addEventListener("mousemove",this.moveBottom);
      }
    });

    this.right.addEventListener('mousedown', (e) => {
    console.log('right working');
      if(e.button == 0){
        window.addEventListener("mousemove",this.moveRight);
      }
    });

    this.adjustControls.addEventListener('click',(e) => {
      if(e.target.nodeName === 'INPUT'){
        if(e.target.id == 'width'){
          e.target.addEventListener('change',(e) => {
            let newWidth = e.target.value;
            this.circleEdges.style.width = parseInt(newWidth)+'px';
          });
        }else{
          let newHeight = e.target.value;
          this.circleEdges.style.height = parseInt(newHeight)+'px';
        }
          this.boundary = this.circleEdges.getBoundingClientRect();
      }

    })

  } //END OF RUN METHOD

  moveTop = (e) => {
    let screenPosX = e.clientX;
    let screenPosY = e.clientY;

    if((screenPosX > this.xAxis["topleft"] && screenPosX < this.xAxis["topright"]) &&
    (screenPosY> (this.yAxis["topleft"]-3) && screenPosY < (this.yAxis["topleft"]+2) )){
      this.top.style.transform = `translateX(${e.clientX - this.xAxis.midpoint}px)`;
      this.changeBorderRadTop(e);
    }
  }

  changeBorderRadTop = (e) => {
    let shortInterval = e.clientX - this.xAxis["topleft"];
    let longInterval = this.xAxis["topright"] - this.xAxis["topleft"];

    let corrFrac = Math.floor(shortInterval/longInterval * 100);
    let remFrac = 100 - corrFrac;

    this.circle.style.borderTopLeftRadius = `${corrFrac}%`;
    this.circle.style.borderTopRightRadius = `${remFrac}%`;
    this.resultOfleftTop[0].textContent = `${corrFrac}%`;
    this.resultOfrightTop[0].textContent = `${remFrac}%`;
  }

  moveBottom = (e) => {
    let screenPosX = e.clientX;
    let screenPosY = e.clientY;

    if((screenPosX > this.xAxis["bottomleft"] && screenPosX < this.xAxis["bottomright"]) &&
    (screenPosY> (this.yAxis["bottomleft"]-3) && screenPosY < (this.yAxis["bottomleft"]+2) )){
      this.bottom.style.transform = `translateX(${e.clientX - this.xAxis.midpoint}px)`;
      this.changeBorderRadBottom(e);
    }
  }

  changeBorderRadBottom = (e) => {
    let shortInterval = e.clientX - this.xAxis["bottomleft"];
    let longInterval = this.xAxis["bottomright"] - this.xAxis["bottomleft"];

    let corrFrac = Math.floor(shortInterval/longInterval * 100);
    let remFrac = 100 - corrFrac;

    this.circle.style.borderBottomLeftRadius = `${corrFrac}%`;
    this.circle.style.borderBottomRightRadius = `${remFrac}%`;
    this.resultOfBottomleft[0].textContent = `${corrFrac}%`;
    this.resultOfBottomright[0].textContent = `${remFrac}%`;
  }


  moveLeft = (e) => {
    let screenPosX = e.clientX;
    let screenPosY = e.clientY;

    if((screenPosX>(this.xAxis["topleft"]-2) && screenPosX < (this.xAxis["topleft"]+2)) &&
      (screenPosY>this.yAxis["topleft"] && screenPosY < this.yAxis["bottomleft"])){
        this.left.style.transform = `translateY(${e.clientY - this.yAxis.midpoint}px)`;
        this.changeBorderRadLeft(e);
    }
  }

  changeBorderRadLeft = (e) => {
    let shortInterval = e.clientY - this.yAxis["topleft"];
    let longInterval = this.yAxis["bottomleft"] - this.yAxis["topleft"];

    let corrFrac = Math.floor(shortInterval/longInterval * 100);
    let remFrac = 100 - corrFrac;

    this.circle.style.borderTopLeftRadius = `${corrFrac}%`;
    this.circle.style.borderBottomLeftRadius = `${remFrac}%`;
    this.resultOfleftTop[1].textContent = `${corrFrac}%`;
    this.resultOfBottomleft[1].textContent = `${remFrac}%`;
  }

  moveRight = (e) => {
    let screenPosX = e.clientX;
    let screenPosY = e.clientY;

    if((screenPosX>this.xAxis["topright"]-2 && screenPosX < this.xAxis["topright"]+2) &&
      (screenPosY>this.yAxis["topright"] && screenPosY < this.yAxis["bottomright"] )){
        this.right.style.transform = `translateY(${e.clientY - this.yAxis.midpoint}px)`;
        this.changeBorderRadRight(e);
    }
  }

  changeBorderRadRight = (e) => {
    let shortInterval = e.clientY - this.yAxis["topleft"];
    let longInterval = this.yAxis["bottomleft"] - this.yAxis["topleft"];

    let corrFrac = Math.floor(shortInterval/longInterval * 100);
    let remFrac = 100 - corrFrac;

    this.circle.style.borderTopRightRadius = `${corrFrac}%`;
    this.circle.style.borderBottomRightRadius = `${remFrac}%`;
    this.resultOfrightTop[1].textContent = `${corrFrac}%`;
    this.resultOfBottomright[1].textContent = `${remFrac}%`;
  }

}

let borderApp = new BorderRadiusFinder();
borderApp.run();
