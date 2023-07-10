function getPendulumValues() {
  const pendulum1 = [document.getElementById('length1').value, document.getElementById('mass1').value, document.getElementById('angle1').value];
  const pendulum2 = [document.getElementById('length2').value, document.getElementById('mass2').value, document.getElementById('angle2').value];
  const pendulum3 = [document.getElementById('length3').value, document.getElementById('mass3').value, document.getElementById('angle3').value];
  const pendulum4 = [document.getElementById('length4').value, document.getElementById('mass4').value, document.getElementById('angle4').value];
  const pendulum5 = [document.getElementById('length5').value, document.getElementById('mass5').value, document.getElementById('angle5').value];

  return [pendulum1, pendulum2, pendulum3, pendulum4, pendulum5];
}

function checkForEmptyParameters(arr1, arr2, arr3, arr4, arr5) {
  const errorMessage = document.getElementById('error-message');
  const arrays = [arr1, arr2, arr3, arr4, arr5];

  if(arrays.some((arr) => arr.some((element) => element === ''))){
        // Display an error message for incomplete fields
        errorMessage.textContent = 'Please fill out all fields - numbers only.';
        errorMessage.style.display = 'block';
        return 1; 
  } else return 0;

}

function checkForInvalidParameters(arr1, arr2, arr3, arr4, arr5) {
  const errorMessage = document.getElementById('error-message');

  let lenInvalid = 0, massInvalid = 0, angInvalid = 0;
  const lengths = [arr1[0], arr2[0], arr3[0], arr4[0], arr5[0]];
  const masses = [arr1[1], arr2[1], arr3[1], arr4[1], arr5[1]];
  const angles = [arr1[2], arr2[2], arr3[2], arr4[2], arr5[2]];

  lenInvalid = lengths.some(element => parseFloat(element) > 1500) ? 1 : 0;
  massInvalid = masses.some(element => parseFloat(element) > 500) ? 1 : 0;
  angInvalid = angles.some(element => parseFloat(element) > 180) ? 1 : 0;

  const errorMessages = [];

  if (lenInvalid) {
    errorMessages.push('Length cannot be more than 1500 cm.');
  }
  if (massInvalid) {
    errorMessages.push('Mass cannot be more than 500 g.');
  }
  if (angInvalid) {
    errorMessages.push('Angle cannot be more than 180 degrees.');
  }

  errorMessage.textContent = errorMessages.join(' '); // Join error messages and assign to textContent

  return (lenInvalid || massInvalid || angInvalid); 
  }

function startPendulum(event) {
  event.preventDefault(); // Prevent the default form submission
  console.log("submit");

  const pendulumValues = getPendulumValues();
  const pendulum1 = pendulumValues[0];
  const pendulum2 = pendulumValues[1];
  const pendulum3 = pendulumValues[2];
  const pendulum4 = pendulumValues[3];
  const pendulum5 = pendulumValues[4];

  const errorMessage = document.getElementById('error-message'); 
  errorMessage.textContent = ''; // Remove error message

  console.log("Sending data to the api..");
  fetch('/api/pendulums', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pendulum1,
      pendulum2,
      pendulum3,
      pendulum4,
      pendulum5
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log("Drawing pendulums...");
    drawPendulums(); // Call drawPendulums function after receiving the response
  })
  .catch(error => {
    console.error(error);
  });
}

function togglePause(event) {
  const pauseButton = document.getElementById('pauseButton');
  event.preventDefault(); // Prevent the default behavior of the button

  if (pauseButton.innerText === 'Pause') {
    pauseButton.innerText = 'Resume';
    pauseButton.style.display = 'inline-block';
  } else {
    pauseButton.innerText = 'Pause';
  }
}

function togglePendulum(event) {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  // Start button is clicked
  event.preventDefault(); // Prevent the default behavior of the button
  if (startButton.innerText === 'Start') {
    pendulums = getPendulumValues()
    if (checkForEmptyParameters(pendulums[0], pendulums[1], pendulums[2], pendulums[3], pendulums[4])) {
      return; // if there are empty fields, stop
    }
    if (checkForInvalidParameters(pendulums[0], pendulums[1], pendulums[2], pendulums[3], pendulums[4])) {
      return; // if there are invalid fields, stop
    }
    startButton.innerText = 'Stop';
    pauseButton.innerText = 'Pause';
    pauseButton.style.display = 'inline-block';
    startPendulum(event); // Call startPendulum function

  } else {
    // stop button is clicked
    startButton.innerText = 'Start';
    pauseButton.style.display = 'none';
  }
}

function drawPendulums() {
  const canvas = document.getElementById('pendulumCanvas');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the rigid support (rod)
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;
  ctx.stroke();

  const pendulumValues = getPendulumValues();
  const scalingFactor = 0.2; // Adjust the scaling factor based on your requirements

    // Draw the pendulums
    const pendulumPositions = [
      { x: canvas.width / 5, y: canvas.height / 2, color: 'palevioletred' },
      { x: 2 * canvas.width / 5, y: canvas.height / 2, color: 'seagreen' },
      { x: 3 * canvas.width / 5, y: canvas.height / 2, color: 'rebeccapurple' },
      { x: 4 * canvas.width / 5, y: canvas.height / 2, color: 'darkblue' },
      { x: 5 * canvas.width / 5, y: canvas.height / 2, color: 'darkred' }
    ];
  

  // Draw the pendulums
  for (let i = 0; i < pendulumValues.length; i++) {
    const [length, mass, angle] = pendulumValues[i];
    const pendulumPos = pendulumPositions[i];

    const rodLength = length * scalingFactor;
    const ballRadius = mass * scalingFactor;
    const bobX = pendulumPos.x + rodLength * Math.sin((90 - angle) * Math.PI / 180);
    const bobY = pendulumPos.y + rodLength * Math.cos((90 - angle) * Math.PI / 180);
    

    // Draw the pendulum string
    ctx.beginPath();
    ctx.moveTo(pendulumPos.x, pendulumPos.y);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = pendulumPos.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the pendulum ball
    ctx.beginPath();
    ctx.arc(bobX, bobY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = pendulumPos.color;
    ctx.fill();
  }

  // other UI updates
}



document.addEventListener('DOMContentLoaded', () => {

  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  
  // Add event listeners to the buttons
  startButton.addEventListener('click', togglePendulum);
  pauseButton.addEventListener('click', togglePause);
});