function submitPendulumData() {
    console.log("submit")

    // pendulum = [length , mass , value]
    const pendulum1 = [ document.getElementById('length1').value, document.getElementById('mass1').value, document.getElementById('angle1').value ]
    const pendulum2 = [ document.getElementById('length2').value, document.getElementById('mass2').value, document.getElementById('angle2').value ]
    const pendulum3 = [ document.getElementById('length3').value, document.getElementById('mass3').value, document.getElementById('angle3').value ]
    const pendulum4 = [ document.getElementById('length4').value, document.getElementById('mass4').value, document.getElementById('angle4').value ]
    const pendulum5 = [ document.getElementById('length5').value, document.getElementById('mass5').value, document.getElementById('angle5').value ]
  
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
  