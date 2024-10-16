<script lang="ts">
  import { onMount } from 'svelte';

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

  // External URL to load when the video ends
  let externalUrl: string = "https://www.eernissefuneralhome.com/obituaries/William-D-Elias-Mitchell?obId=31614505";

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
      width="450vh"
      height="800vh"
      src={getEmbedUrl(shortUrls[currentIndex])}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <button on:click={nextVideo}>⬇️ Next</button>
  </div>

  <!-- Fullscreen iframe that fades in when the video ends -->
  {#if showExternalIframe}
    <div class="overlay" on:click={escape}>
    <button id="escape">Escape</button>
    <iframe
        title="Disease"
        width="100%"
        height="100%"
        src={externalUrl}
        frameborder="0"
        allowfullscreen
        pointer-events="none"
      ></iframe>
    </div>
  {/if}
</main>

<style>
  .youtube-short {
    text-align: center;
    padding: 20px;
  }

  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
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
  }

  button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  /* Fullscreen overlay that fades in */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 10s forwards ease-in-out;
  }

  #escape {
    position: absolute;
    top: 10px;
    padding: 10px 20px;
    font-size: 36px;
    background-color: #f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    animation: fadeIn2 12s forwards ease-in;
  }

  h1 {
    margin-top: 0px;
  }

  h3 {
    font-weight: lighter;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      pointer-events: none;
    }
    to {
      opacity: 1;
      pointer-events: all;
    }
  }

    @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>