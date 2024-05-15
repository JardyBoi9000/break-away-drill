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

    // Function to play the audio for the given number
    function playNumberAudio(number) {
        const audioElement = document.getElementById(`audio-${number}`);
        audioElement.currentTime = 0; // Reset audio to the start
        audioElement.play();
    }

    // Start generating random numbers after 1 second
    const startInterval = setTimeout(() => {
        interval = setInterval(() => {
            randomNumber = Math.floor(Math.random() * 9) + 1;
            resultElement.innerText = randomNumber;
            playNumberAudio(randomNumber);  // Play the random number audio
        }, 500);
    }, 1000);

    // Ensure the chosen number is called out within 7 seconds
    const endTimeout = setTimeout(() => {
        clearInterval(interval);
        resultElement.innerText = `Generated your number: ${chosenNumber}`;
        playNumberAudio(chosenNumber);  // Play the chosen number audio
    }, 7000);

    // Check every 500ms if the random number matches the chosen number after the first second
    const checkInterval = setInterval(() => {
        if (randomNumber === chosenNumber) {
            clearTimeout(startInterval);
            clearTimeout(endTimeout);
            clearInterval(interval);
            clearInterval(checkInterval);
            resultElement.innerText = `Generated your number: ${randomNumber}`;
            playNumberAudio(randomNumber);  // Play the matched number audio
        }
    }, 500);
}
