class Mainpanel{
    
    constructor(){
        this.palette = document.querySelector('#pallette');
        this.speed = document.querySelector('#speed');
        this.twist = document.querySelector('#twist');
        this.centred = document.querySelector('#centred');
        this.line = document.querySelector('#line');
    }
    render(){
        this.handleChange();
    }
  
    handleChange(){
        this.palette.addEventListener('change', this.sendReq(this.palette));
        this.speed.addEventListener('change', this.sendReq(this.speed));
        this.twist.addEventListener('change', this.sendReq(this.twist));
        this.centred.addEventListener('change', this.sendReq(this.centred));
        this.line.addEventListener('change', this.sendReq(this.line));
    }
    sendReq(param){
      console.log(param.value);
    }
  
  }
  
  
  const Panel = new Mainpanel;
  
  Panel.render()