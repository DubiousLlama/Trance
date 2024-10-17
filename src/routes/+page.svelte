<script lang="ts">
  import { onMount } from 'svelte';
  import Overlay from './overlay.svelte'

  // Define types for player and timeout
  let player: YT.Player | undefined;
  let timeout: ReturnType<typeof setTimeout>;

  // List of YouTube Short URLs
  let shortUrls: string[] = [
    "https://www.youtube.com/shorts/HTHhQfzsALY",
    "https://www.youtube.com/shorts/MGCDps-C_a4",
    "https://www.youtube.com/shorts/ioAkpOCZeHk",
    "https://www.youtube.com/shorts/a5yYVZYY0vI",
    "https://www.youtube.com/shorts/Fu4AWHjeS_k",
    "https://www.youtube.com/shorts/S2oGHn4FonA",
    "https://www.youtube.com/shorts/uzAytgFuBR4",
    "https://www.youtube.com/shorts/V8cgRAZdQKI",
  ];

  // Variable to track the current video index
  let currentIndex: number = 0;

  // Variable to track if the external iframe should be displayed
  let showExternalIframe: boolean = false;

  let countdown: number = 2;  // Timer starts at 10 seconds
  let countdownInterval: ReturnType<typeof setInterval>; // Interval for countdown

  // Extract the video ID from the current URL to create the embed URL
  function getEmbedUrl(url: string): string {
    const videoId: string = url.split("/shorts/")[1];
    console.log("Current video ID: ", videoId);
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&`;
  }

  // Navigate to the previous video in the list
  function prevVideo(): void {
    console.log("Previous button clicked");
    if (currentIndex === 0) {
    currentIndex = shortUrls.length - 1;
    } else {
    currentIndex--;
    }
    resetTimer();  // Reset timer when user interacts

  }

  // Navigate to the next video in the list
  function nextVideo(): void {
    console.log("Next button clicked");
    if (currentIndex === shortUrls.length - 1) {
    currentIndex = 0;
    } else {
    currentIndex++;
    }
    resetTimer();  // Reset timer when user interacts
  }

    // Start the countdown timer
  function startCountdown(): void {
    countdownInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        showExternalIframe = true;  // Show the external iframe when timer hits 0
        clearInterval(countdownInterval);
      }
    }, 1000); // Countdown decreases every second
  }

  // Reset the countdown timer to 10 and start it again
  function resetTimer(): void {
    clearInterval(countdownInterval);  // Stop any existing timer
    countdown = 10;  // Reset countdown to 10 seconds
    showExternalIframe = false;  // Hide iframe when reset
    startCountdown();  // Start the countdown again
  }

  function escape(): void{
    resetTimer();
    showExternalIframe = false;
  }

  function like(): void{

  }

  // Initialize the countdown on mount
  onMount(() => {
    startCountdown();
  });
</script>

<main class="youtube-short">
  <h1>Trance v4.5.1</h1>
  <h3>Treatment in progress. Scroll 3-4 times per minute, or as prescribed by a physician.</h3>

  <!-- Display countdown timer
  <div class="countdown">
    Time remaining: {countdown} seconds
  </div> -->

  <!-- Buttons to navigate between videos -->
  <div class="navigation">
    <button on:click={prevVideo}>⬆️ Previous</button>
    <iframe
      title="Medication"
      id="youtubePlayer"
      class="yt"
      src={getEmbedUrl(shortUrls[currentIndex])}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div id = "rightButtons">
      <button on:click={like}>Like</button>
      <button on:click={nextVideo}>⬇️ Next</button>
    </div>
  </div>

  <!-- Fullscreen iframe that fades in when the video ends -->
  {#if showExternalIframe}
    <Overlay buttonClick={escape}/>
  {/if}
</main>

<style>
  .youtube-short {
    text-align: center;
    padding: 20px;
  }

  .yt {
    width: 45vh;
    height: 80vh;
  }

  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  #rightButtons {
    display: flex;
    flex-direction: column;
  }

  iframe {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
  }

  button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
</style>