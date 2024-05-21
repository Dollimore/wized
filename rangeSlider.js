let sliderTrack = document.getElementById('rangeTrack1');
let thumb1 = document.getElementById('rangeSliderThumb1');
let thumb2 = document.getElementById('rangeSliderThumb2');
let progress = document.getElementById('rangeFill1');
let lowValElement = document.getElementById('minVal');
let highValElement = document.getElementById('maxVal');

// adjust the below values to suit your needs

let minValue = 0;
let maxValue = 1000;
let step = 10;
let minDistance = (maxValue - minValue) * 0.1;

let thumb1Value = minValue;
let thumb2Value = maxValue;

let isDragging1 = false;
let isDragging2 = false;

  function updateSliderStyles() {
    let percentage1 = ((thumb1Value - minValue) / (maxValue - minValue)) * 100;
    let percentage2 = ((thumb2Value - minValue) / (maxValue - minValue)) * 100;

    thumb1.style.left = percentage1 + '%';
    thumb2.style.left = percentage2 + '%';
    progress.style.left = percentage1 + '%';
    progress.style.width = (percentage2 - percentage1) + '%';

    lowValElement.textContent = thumb1Value.toFixed(0);
    highValElement.textContent = thumb2Value.toFixed(0);
    
    // replace with your variables
    v.rangeSliderValues.rangeLow = parseFloat(thumb1Value.toFixed(0))
    v.rangeSliderValues.rangeHigh= parseFloat(thumb2Value.toFixed(0))
  }

  function handleSliderMovement(event, thumb, isThumb1) {
    let boundingRect = sliderTrack.getBoundingClientRect();
    let offsetX = event.clientX - boundingRect.left;
    let percentage = (offsetX / boundingRect.width) * 100;
    let value = minValue + (percentage / 100) * (maxValue - minValue);
    value = Math.round(value / step) * step;

    if (isThumb1) {
      let newThumb1Value = Math.max(minValue, Math.min(thumb2Value - minDistance, value));
      thumb1Value = newThumb1Value;
    } else {
      let newThumb2Value = Math.min(maxValue, Math.max(thumb1Value + minDistance, value));
      thumb2Value = newThumb2Value;
    }
    updateSliderStyles();
  }

  updateSliderStyles();

  thumb1.addEventListener('mousedown', function(event) {
    isDragging1 = true;
    handleSliderMovement(event, thumb1, true);

    function handleMouseMove(event) {
      if (isDragging1) handleSliderMovement(event, thumb1, true);
    }

    function handleMouseUp() {
      isDragging1 = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  thumb2.addEventListener('mousedown', function(event) {
    isDragging2 = true;
    handleSliderMovement(event, thumb2, false);

    function handleMouseMove(event) {
      if (isDragging2) handleSliderMovement(event, thumb2, false);
    }

    function handleMouseUp() {
      isDragging2 = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  thumb1.addEventListener('touchstart', function(event) {
    isDragging1 = true;
    handleSliderMovement(event.touches[0], thumb1, true);

    function handleTouchMove(event) {
      if (isDragging1) handleSliderMovement(event.touches[0], thumb1, true);
    }

    function handleTouchEnd() {
      isDragging1 = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  });

  thumb2.addEventListener('touchstart', function(event) {
    isDragging2 = true;
    handleSliderMovement(event.touches[0], thumb2, false);

    function handleTouchMove(event) {
      if (isDragging2) handleSliderMovement(event.touches[0], thumb2, false);
    }

    function handleTouchEnd() {
      isDragging2 = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  });

