const baseUrl = "https://pokeapi.co/api/v2/"
function dataPrep(value, node){
  let val, arg
  switch (node) {
    case 'pallette':
    val= Math.floor(value/10);
    if( val == 1) { val = "RainbowColors_p";}
    if( val == 2) { val = "RainbowStripeColors_p";}
    if( val == 3) { val = "HeatColors_p";}
    if( val == 4) { val = "LavaColors_p";}
    if( val == 5) { val = "CloudColors_p";}
    if( val == 6) { val = "OceanColors_p";}
    if( val == 7) { val = "ForestColors_p";}
    if( val == 8) { val = "PartyColors_p";}
    if( val == 9) { val = "sutaburosuRainbowPalette";}
      break;

    case 'speed':
    val = Math.floor(value/3.33333)
      break;

    case 'twist':
      document.querySelector(`#${node}`).checked ? val = 1 : val = 0
      break;

    case 'line':
      val= Math.floor(value/10)+5;
      break;

    case 'centred':
      document.querySelector(`#${node}`).checked ? val = 1 : val = 0
      break;
      
    case 'brightness':
      val= Math.floor(value/0.392156862745098);

      break;
    default:
      break;
  }
  makeReq(val, node, arg)
  return val
}

function makeReq(value, name, arg){
  console.log('http://192.168.178.45/update?' + `${name}=${value}`);
  
  // var path = baseUrl + 'pokemon/ditto'

  // var myHeaders = new Headers();
  // myHeaders.append("Cookie", "cool");
  
  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow'
  // };
  
  // path = baseUrl + 'pokemon/ditto'

  // fetch(path, requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
}

function updateDonut(percent, element){
    //var percent = 45;
    if (percent < 50){
      offset = (360 / 100) * percent;
      element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(" + offset + "deg)";
      element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" + (180 - offset) + "deg)";
      element.parentNode.querySelector("#section3").style.msTransform = "rotate(" + offset + "deg)";
      element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" + (180 - offset) + "deg)";
      element.parentNode.querySelector("#section3").style.MozTransform = "rotate(" + offset + "deg)";
      element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" + (180 - offset) + "deg)";
      element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#666";
    } else { 
      offset = ((360 / 100) * percent) - 180;
      element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(180deg)";
      element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" +  offset + "deg)";
      element.parentNode.querySelector("#section3").style.msTransform = "rotate(180deg)";
      element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" +  offset + "deg)";
      element.parentNode.querySelector("#section3").style.MozTransform = "rotate(180deg)";
      element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" +  offset + "deg)";   
      element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#fff";
    }
  
  }

  
  function updateSlider(element) {
    if (element.getAttribute('type')=="range") {
      var parent = element.parentElement;
      var center = parent.parentNode.querySelector('.center')
      var thumb = parent.querySelector('.range-slider__thumb'),
          bar = parent.querySelector('.range-slider__bar'),
          pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
      thumb.style.bottom = pct + '%';
      bar.style.height = 'calc(' + pct + '% + ' + thumb.clientHeight / 2 + 'px)';
      updateDonut(element.value, element.parentNode);
      if (element.getAttribute('max')==Math.round(element.value)){
        center.style.background = 'linear-gradient(335deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
        center.classList.add('heartbeat')
      }else{
        center.style.background = 'linear-gradient(335deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)';
        [...center.classList].includes('heartbeat') && center.classList.remove('heartbeat')
      }
    }
  }


  (function initAndSetupTheSliders() {
    
    
      [].forEach.call(document.getElementsByClassName("container"), function(el) {
      
        var inputs = [].slice.call(el.querySelectorAll('.range-slider input'));
        inputs.forEach(function (input) {
          
            updateSlider(input);
            input.addEventListener('input', function (element) {
                updateSlider(input);
            });
            input.addEventListener('change', function (element) {
                dataPrep(input.value, input.id);
            });
        });
      });
  }());