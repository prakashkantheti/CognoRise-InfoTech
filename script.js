 // Selecting elements from the DOM
const countdownElement = document.getElementById('countdown');
const countdownForm = document.getElementById('countdownForm');
const datetimeInput = document.getElementById('datetime');

let countdownInterval;

// Function to start the countdown
function startCountdown(event) {
  event.preventDefault();
  
  // Get the target date and time from the input
  const targetDate = new Date(datetimeInput.value);
  
  // Update the countdown every second
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const difference = targetDate - currentTime;
    
    if (difference > 0) {
      // Calculating days, hours, minutes, and seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Display the countdown with leading zeros
      countdownElement.innerHTML = `
        <span>${days.toString().padStart(2, '0')}</span>d 
        <span>${hours.toString().padStart(2, '0')}</span>h 
        <span>${minutes.toString().padStart(2, '0')}</span>m 
        <span>${seconds.toString().padStart(2, '0')}</span>s
      `;
    } else {
      // If the countdown is finished, display "Countdown expired"
      clearInterval(countdownInterval);
      countdownElement.innerHTML = "Countdown expired";
    }
  }, 1000); // Update every second
}

// Event listener for the form submission
countdownForm.addEventListener('submit', startCountdown);
