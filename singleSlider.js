let slider = document.getElementById('rangeTrack');
let thumb = document.getElementById('rangeSliderThumb');
let progress = document.getElementById('rangeFill');
let sliderSpan = document.getElementById('valueSpan');

// adjust the below values to suit your needs

let initialValue = 4;
let minValue = 0;
let maxValue = 30;
let step = 0.1;

let isDragging = false;

let sliderValue = initialValue;

function updateSliderStyles(value) {
  let percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  thumb.style.left = Math.min(100, Math.max(0, percentage)) + '%';
  progress.style.width = Math.min(100, Math.max(0, percentage)) + '%';
  updateSliderSpan(value);
}

function updateSliderSpan(value) {
  sliderSpan.textContent = value.toFixed(2); 
}

function handleSliderMovement(event) {
  if (isDragging) {
    let boundingRect = slider.getBoundingClientRect();
    let offsetX = event.clientX - boundingRect.left;
    let percentage = (offsetX / boundingRect.width) * 100;
    let value = minValue + (percentage / 100) * (maxValue - minValue);
    value = Math.max(minValue, Math.min(maxValue, value));
    v.rangeSliderValues.singleValue = parseFloat(value.toFixed(2));  // Replace with your variable
    updateSliderStyles(value);
  }
}

updateSliderStyles(initialValue);

thumb.addEventListener('mousedown', function(event) {
  isDragging = true;
  handleSliderMovement(event);

  function handleMouseMove(event) {
    handleSliderMovement(event);
  }

  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

// Event listeners for touch interaction
thumb.addEventListener('touchstart', function(event) {
  isDragging = true;
  handleSliderMovement(event.touches[0]);

  function handleTouchMove(event) {
    handleSliderMovement(event.touches[0]);
  }

  function handleTouchEnd() {
    isDragging = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }

  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
});
