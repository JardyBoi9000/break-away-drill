let chosenNumber = null;

function selectNumber(number) {
    chosenNumber = number;
    document.getElementById('result').innerText = `You selected: ${number}`;
    document.getElementById('start-button').disabled = false;
}

function startRNG() {
    if (chosenNumber === null) {
        alert('Please select a number between 1 and 9.');
        return;
    }

    const resultElement = document.getElementById('result');
    resultElement.innerText = 'Generating...';

    let randomNumber;
    let interval;
    let count = 0;

    // Function to play the audio for the given number
    function playNumberAudio(number) {
        console.log(`Playing audio for number: ${number}`);
        const audioElement = document.getElementById(`audio-${number}`);
        audioElement.currentTime = 0; // Reset audio to the start
        audioElement.play().catch(error => {
            console.error('Audio play failed:', error);
        });
    }

    // Ensure the chosen number is called out within the first 12 numbers, but not in the first two numbers
    const startInterval = setTimeout(() => {
        interval = setInterval(() => {
            count++;
            if (count <= 2 || (count <= 12 && Math.random() < 0.8)) {
                // Avoid calling the chosen number in the first two counts and with some probability up to the 12th count
                do {
                    randomNumber = Math.floor(Math.random() * 9) + 1;
                } while (randomNumber === chosenNumber);
            } else {
                randomNumber = chosenNumber;
            }
            
            resultElement.innerText = randomNumber;
            playNumberAudio(randomNumber);  // Play the random number audio

            if (randomNumber === chosenNumber) {
                clearInterval(interval); // Stop the interval when the chosen number is reached
                resultElement.innerText = `Generated your number: ${chosenNumber}`;
            }

            if (count >= 12) {
                clearInterval(interval); // Safety stop in case the chosen number hasn't been called by the 12th number
            }
        }, 500);
    }, 2000); // 2-second delay before starting
}
