const baseUrl = "https://pokeapi.co/api/v2/"
function dataPrep(value, node){
  let val

  // TODO :: Adding functionality to the params ===> BPM , pattern , translation-speed
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
  return val
}

function makeReq(value, name, arg){
  console.log(baseUrl + '/update?' + `${name}=${value}`);
  
  var path = baseUrl + '/update?' + `${name}=${value}`);

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "cool");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(path, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function updateDonut(percent, element){
      
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

  
  function updateSlider(element, btnFn) {
    
    if (element.getAttribute('type')=="range") {

      if (btnFn == "add") element.value = (parseFloat(element.value) + parseFloat(element.getAttribute('step')))// Adding button
      if (btnFn == "minus") element.value = (parseFloat(element.value) - parseFloat(element.getAttribute('step')))// Minus button

      var parent = element.parentElement;
      var center = parent.parentNode.querySelector('.center')
      var thumb = parent.querySelector('.range-slider__thumb'),
          bar = parent.querySelector('.range-slider__bar'),
          pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
      
      center.innerHTML = `<h4 class = "center-text" style = "margin : 0; color : white;" >${dataPrep(element.value, element.id)}</h4>`
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


  // changing the slider depending on the button input
  function changeValue(node, action) { 
    var parent = node.parentElement;
    if (action == 'makeReq') {
      let val = dataPrep(parent.querySelector('.range-slider').children[0].value, parent.querySelector('.range-slider').children[0].id)
      makeReq(val, parent.querySelector('.range-slider').children[0].id)
    }
    if([...node.classList].includes('minus')){
      updateSlider(node.previousElementSibling.children[0], 'minus')
    }else{
      updateSlider(node.nextElementSibling.children[0], 'add')
    }
  }

    

  (function initAndSetupTheSliders() {
    
    
      [].forEach.call(document.getElementsByClassName("container"), function(el) {
      
        var sliders = [].slice.call(el.querySelectorAll('.range-slider input'));
        sliders.forEach(function (slider) {
          
            updateSlider(slider);
            slider.addEventListener('input', function (element) {
                updateSlider(slider); //update slider position
            });
            slider.addEventListener('change', function (element) {
                let val = dataPrep(slider.value, slider.id); //only send request when slider change settles
                makeReq(val, slider.id)
            });
        });

        var buttons = [].slice.call(el.querySelectorAll('.btn'));// creating event listener for the plus and minus buttons
        buttons.forEach(function(button){
          
          let timerID,
              counter = 0,
              pressHoldDuration = 2000,//maximum button hold duration
              moved //variable changes over drag to fix mouse drag errors

          //fix for mouse drag errors
          button.addEventListener("mousemove", function(e) {
            moved = true 
          }, false);

          //click event to update slider
          button.addEventListener('click', function(element){
            changeValue(button);
            moved = false
          });
          
          //Mobile functionality
          // Pressing start
          button.addEventListener("touchstart", function(e) {
            moved = false
            requestAnimationFrame(timer);
            e.preventDefault();
          }, false);

          //Mobile functionality
          // Pressing end
          button.addEventListener("touchend", function(e) {
            moved = false
            cancelAnimationFrame(timerID);
            counter = 0;
            changeValue(button, 'makeReq');
          }, false);

          // Pressing end
          button.addEventListener("mousedown", function(e) {
            requestAnimationFrame(timer);
            e.preventDefault();
            console.log("Pressing!");
            moved = false
          }, false);

          
          // Pressing end 
          // Send request with data
          button.addEventListener("mouseup", function(e) {
            moved = false
            cancelAnimationFrame(timerID);
            counter = 0;
            console.log("Not pressing!");
            changeValue(button, 'makeReq');
          }, false);

          function timer() {
            
            if ((counter < pressHoldDuration) && (moved == false)) {// Send request with data only if no drag

              let sensitivity = 0.25 // button sensitivity
              timerID = requestAnimationFrame(timer);
              counter += sensitivity

            } else {
              console.log("Press threshold reached!");
            } 
            if (counter %2 == 0) {
              changeValue(button, 'update'); // Change value with sensitivity
            }
          }
        });

      });
  }());

 