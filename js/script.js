function checkForEmptyParameters(arr1, arr2, arr3, arr4, arr5) {
  const arrays = [arr1, arr2, arr3, arr4, arr5];

  return arrays.some((arr) => arr.some((element) => element === ''));
}

function checkForInvalidParameters(arr1, arr2, arr3, arr4, arr5){
  let lenInvalid, massInvalid, angInvalid = 0
  lengths = [ arr1[0], arr2[0], arr3[0], arr4[0], arr5[0] ]
  masses = [ arr1[1], arr2[1], arr3[1], arr4[1], arr5[1] ]
  masses = [ arr1[2], arr2[2], arr3[2], arr4[2], arr5[2] ] 

  lenInvalid = Array.from(lengths).some(element => parseFloat(element.value) > 200) ? 1 : 0;
  massInvalid = Array.from(masses).some(element => parseFloat(element.value) > 500) ? 1 : 0;
  angInvalid = Array.from(angles).some(element => parseFloat(element.value) > 180) ? 1 : 0;

  invalids = [lenInvalid , massInvalid , angInvalid]
  return (invalids)

}

function startPendulum(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("submit")

    // pendulum = [length , mass , value]
    const pendulum1 = [ document.getElementById('length1').value, document.getElementById('mass1').value, document.getElementById('angle1').value ]
    const pendulum2 = [ document.getElementById('length2').value, document.getElementById('mass2').value, document.getElementById('angle2').value ]
    const pendulum3 = [ document.getElementById('length3').value, document.getElementById('mass3').value, document.getElementById('angle3').value ]
    const pendulum4 = [ document.getElementById('length4').value, document.getElementById('mass4').value, document.getElementById('angle4').value ]
    const pendulum5 = [ document.getElementById('length5').value, document.getElementById('mass5').value, document.getElementById('angle5').value ]

    const errorMessage = document.getElementById('error-message');

    if (checkForEmptyParameters(pendulum1, pendulum2, pendulum3, pendulum4, pendulum5)) {
      // Display an error message for incomplete fields
      errorMessage.textContent = 'Please fill out all fields';
      errorMessage.style.display = 'block';
  
      return; // Stop further execution if validation fails
    }

    const invalidParameters = checkForInvalidParameters(pendulum1, pendulum2, pendulum3, pendulum4, pendulum5);
    if (invalidParameters.includes(1)) {
      if(invalidParameters[0]) errorMessage.textContent += ' Length cannot be more than 200 cm.', errorMessage.style.display = 'block';
      if(invalidParameters[1]) errorMessage.textContent += ' Mass cannot be more than 500 g.', errorMessage.style.display = 'block';
      if(invalidParameters[2]) errorMessage.textContent += ' Mass cannot be more than 180 degrees.', errorMessage.style.display = 'block';
      return; // Stop further execution if validation fails
    }

    errorMessage.textContent = "" // remove error message

    fetch('/api/pendulum', {
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
          // Add your error handling logic here
        });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');
  
    
  // Function to handle the click event of the Start button
  function togglePendulum() {
    const pendulum1 = [ document.getElementById('length1').value, document.getElementById('mass1').value, document.getElementById('angle1').value ]
    const pendulum2 = [ document.getElementById('length2').value, document.getElementById('mass2').value, document.getElementById('angle2').value ]
    const pendulum3 = [ document.getElementById('length3').value, document.getElementById('mass3').value, document.getElementById('angle3').value ]
    const pendulum4 = [ document.getElementById('length4').value, document.getElementById('mass4').value, document.getElementById('angle4').value ]
    const pendulum5 = [ document.getElementById('length5').value, document.getElementById('mass5').value, document.getElementById('angle5').value ]
    
    if (checkForEmptyParameters(pendulum1, pendulum2, pendulum3, pendulum4, pendulum5)) {
      return; // Stop further execution if validation fails
    }

    if (startButton.innerText === 'Start') {
      // Start button is clicked
      startButton.innerText = 'Stop';
      pauseButton.style.display = 'inline-block';
    } else {
      // Stop button is clicked
      startButton.innerText = 'Start';
      pauseButton.style.display = 'none';
    }
  }

  // Function to handle the click event of the Pause button
  function togglePause() {
    if (pauseButton.innerText === 'Pause') {
      // Pause button is clicked
      pauseButton.innerText = 'Resume';
    } else {
      // Resume button is clicked
      pauseButton.innerText = 'Pause';
    }
  }

  // Function to handle the click event of the Stop button
  function stopPendulum() {
    startButton.innerText = 'Start';
    pauseButton.style.display = 'none';
  }
    
  // Add event listeners to the buttons
  startButton.addEventListener('click', togglePendulum);
  pauseButton.addEventListener('click', togglePause);
  }); 
    
