function startRNG() {
    const chosenNumber = parseInt(document.getElementById('chosenNumber').value);
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 9) {
        alert('Please enter a valid number between 1 and 9.');
        return;
    }

    const resultElement = document.getElementById('result');
    resultElement.innerText = 'Generating...';

    let randomNumber;
    let interval;

    // Function to speak the number
    function speakNumber(number) {
        const msg = new SpeechSynthesisUtterance(number.toString());
        window.speechSynthesis.speak(msg);
    }

    // Start generating random numbers after 1 second
    const startInterval = setTimeout(() => {
        interval = setInterval(() => {
            randomNumber = Math.floor(Math.random() * 9) + 1;
            resultElement.innerText = randomNumber;
            speakNumber(randomNumber);  // Speak the random number
        }, 500);
    }, 1000);

    // Ensure the chosen number is called out within 7 seconds
    const endTimeout = setTimeout(() => {
        clearInterval(interval);
        resultElement.innerText = `Generated your number: ${chosenNumber}`;
        speakNumber(chosenNumber);  // Speak the chosen number
    }, 7000);

    // Check every 500ms if the random number matches the chosen number after the first second
    const checkInterval = setInterval(() => {
        if (randomNumber === chosenNumber) {
            clearTimeout(startInterval);
            clearTimeout(endTimeout);
            clearInterval(interval);
            clearInterval(checkInterval);
            resultElement.innerText = `Generated your number: ${randomNumber}`;
            speakNumber(randomNumber);  // Speak the matched number
        }
    }, 500);
}
