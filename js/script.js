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
        errorMessage.textContent = 'Please fill out all fields';
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

  lenInvalid = lengths.some(element => parseFloat(element) > 200) ? 1 : 0;
  massInvalid = masses.some(element => parseFloat(element) > 500) ? 1 : 0;
  angInvalid = angles.some(element => parseFloat(element) > 180) ? 1 : 0;

  const errorMessages = [];

  if (lenInvalid) {
    errorMessages.push('Length cannot be more than 200 cm.');
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

  createPendulums(pendulumValues);

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
    // Add your logic here to handle the response from the server
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

document.addEventListener('DOMContentLoaded', () => {

  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  
  // Add event listeners to the buttons
  startButton.addEventListener('click', togglePendulum);
  pauseButton.addEventListener('click', togglePause);
});