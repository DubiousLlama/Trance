<script lang="ts">
	import { onMount } from 'svelte';
	import Overlay from './overlay.svelte';
	import { reccomend, videoList, Video, getWatchedList, addWatchItem, getVideoByUrl, resetWatchHistory } from '$lib/reccomend';
    import EmojiButtons from './emojiButtons.svelte';
	import NavButtons from './navButtons.svelte';

	// Define types for player and timeout
	let player: any;
	let timeout: ReturnType<typeof setTimeout>;

	// Variable to track the current video index
	let currentVideo: Video = videoList[0];

	let videoIndex = 0;

	const defaultVideo = videoList[0];

	// Variable to track if the external iframe should be displayed
	let showExternalIframe: boolean = false;

	let countdown: number = 2; // Timer starts at 10 seconds
	let countdownInterval: ReturnType<typeof setInterval>; // Interval for countdown

	// Extract the video ID from the current URL to create the embed URL
	function getEmbedUrl(url: string): string {
		const videoId: string = url.split('/shorts/')[1];
		console.log('Current video ID: ', videoId);
		return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1`;
	}

	// Navigate to the previous video in the list
	function nextVideo(): void {
		console.log('Next button clicked');
		videoIndex = videoIndex + 1;
		if (videoIndex >= getWatchedList().length) {
            let newVideoUrl = reccomend(videoList, currentVideo.url);
            console.log("Getting new video")
            addWatchItem(newVideoUrl);
			currentVideo = getVideoByUrl(newVideoUrl) ?? defaultVideo;
		} else {
            console.log("Getting next video")
            console.log(getWatchedList())
            let nextVideoUrl = getWatchedList().at(videoIndex) ?? defaultVideo.url;
            currentVideo = getVideoByUrl(nextVideoUrl) ?? defaultVideo;
		}
		resetTimer(); // Reset timer when user interacts
	}

	// Navigate to the next video in the lists
	function prevVideo(): void {
		if (videoIndex > 0) {
			videoIndex -= 1;
			let lastVideoUrl = getWatchedList().at(videoIndex) ?? defaultVideo.url;
			currentVideo = getVideoByUrl(lastVideoUrl) ?? defaultVideo;
			resetTimer(); // Reset timer when user interacts
		}
	}

	// Start the countdown timer
	function startCountdown(): void {
		countdownInterval = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			} else {
				showExternalIframe = true; // Show the external iframe when timer hits 0
				clearInterval(countdownInterval);
			}
		}, 1000); // Countdown decreases every second
	}

	// Reset the countdown timer to 10 and start it again
	export function resetTimer(): void {
		clearInterval(countdownInterval); // Stop any existing timer
		countdown = 10; // Reset countdown to 10 seconds
		showExternalIframe = false; // Hide iframe when reset
		startCountdown(); // Start the countdown again
	}

	function escape(): void {
		resetTimer();
		showExternalIframe = false;
	}

	// Add these variables at the top of your script with the other declarations
let touchStartY: number = 0;
let scrollTimeout: ReturnType<typeof setTimeout>;
let isScrolling: boolean = false;

// Add this function after your existing function declarations
function handleScroll(event: WheelEvent | TouchEvent): void {
    if (isScrolling) return;
    isScrolling = true;

    // Clear existing scroll timeout
    clearTimeout(scrollTimeout);

    if (event instanceof WheelEvent) {
        // Handle mouse wheel/trackpad scroll
        if (event.deltaY > 20) {
            nextVideo();
        } else if (event.deltaY < -20) {
            prevVideo();
        }
    }

    // Set a timeout to prevent rapid consecutive scrolls
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 250); // Adjust this value to control scroll sensitivity
}

// Add these touch event handlers
function handleTouchStart(event: TouchEvent): void {
    touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event: TouchEvent): void {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    // Threshold for swipe detection (adjust as needed)
    const threshold = 50;

    if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
            nextVideo(); // Swipe up
        } else {
            prevVideo(); // Swipe down
        }
    }
}

// Modify your onMount to include the event listeners
onMount(() => {
    startCountdown();
    resetWatchHistory();

    // Add event listeners for scroll and touch
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Clean up event listeners on component destruction
    return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
    };
});

	// Initialize the countdown on mount
	onMount(() => {
		startCountdown();
        resetWatchHistory();
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
		<iframe
			title="Medication"
			id="youtubePlayer"
			class="yt"
			src={getEmbedUrl(currentVideo?.url ?? '')}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
		<div id="rightButtons">
			<EmojiButtons currentVideo={currentVideo}  resetTimer={resetTimer}/>
		</div>
	</div>

	<!-- Fullscreen iframe that fades in when the video ends -->
	{#if showExternalIframe}
		<Overlay buttonClick={escape} />
	{/if}
</main>

		<NavButtons     {prevVideo}
    {nextVideo}/>

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
	.hidden {
		visibility: hidden;
		pointer-events: none;
	}
</style>
