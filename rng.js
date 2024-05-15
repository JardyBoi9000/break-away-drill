let chosenNumber = null;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'en-US';

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

    // Function to play the audio for the given number
    function playNumberAudio(number) {
        console.log(`Playing audio for number: ${number}`);
        const audioElement = document.getElementById(`audio-${number}`);
        audioElement.currentTime = 0; // Reset audio to the start
        audioElement.play().catch(error => {
            console.error('Audio play failed:', error);
        });
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

function startVoiceRecognition() {
    recognition.start();
    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        console.log(`Recognized speech: ${spokenText}`);
        const number = parseInt(spokenText);
        if (!isNaN(number) && number >= 1 && number <= 9) {
            selectNumber(number);
        } else if (spokenText.includes('start')) {
            startRNG();
        } else {
            alert('Please say a number between 1 and 9, or say "start" to begin.');
        }
    };
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
}
