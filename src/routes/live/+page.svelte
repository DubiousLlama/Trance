<script lang="ts">
	import { onMount } from 'svelte';
	import Overlay from './overlay.svelte';
	import { reccomend, videoList, Video, getWatchedList, addWatchItem, getVideoByUrl, resetWatchHistory } from '$lib/reccomend';
	import EmojiButtons from './emojiButtons.svelte';
	import NavButtons from './navButtons.svelte';
	import { checkEndConditions } from '$lib/checkendconditions';
	import { goto } from '$app/navigation';

	// Define player and timeout
	let videoElement: HTMLVideoElement;
	let timeout: ReturnType<typeof setTimeout>;

	// Track current video and index
	let currentVideo: Video = videoList[0];
	let videoIndex = 0;
	let backoff = 1;

	const defaultVideo = videoList[0];

	// Track if external overlay should be displayed
	let showExternalIframe: boolean = false;

	let countdown: number = 8;
	let countdownInterval: ReturnType<typeof setInterval>;

	// Navigate to the next video
	function nextVideo(): void {
		videoIndex += 1;
		if (videoIndex >= getWatchedList().length) {
            let newVideoUrl = reccomend(videoList, currentVideo.url);
            addWatchItem(newVideoUrl);
			let end = checkEndConditions(currentVideo.url);
			if (end != "") {
				goto("/" + end);
			}
			currentVideo = getVideoByUrl(newVideoUrl) ?? defaultVideo;
		} else {
            let nextVideoUrl = getWatchedList().at(videoIndex) ?? defaultVideo.url;
            currentVideo = getVideoByUrl(nextVideoUrl) ?? defaultVideo;
		}
		resetTimer();
		loadCurrentVideo();
	}

	// Navigate to the previous video
	function prevVideo(): void {
		if (videoIndex > 0) {
			videoIndex -= 1;
			let lastVideoUrl = getWatchedList().at(videoIndex) ?? defaultVideo.url;
			currentVideo = getVideoByUrl(lastVideoUrl) ?? defaultVideo;
			resetTimer();
			loadCurrentVideo();
		}
	}

	// Start the countdown timer
	function startCountdown(): void {
		countdownInterval = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			} else {
				showExternalIframe = true;
				clearInterval(countdownInterval);
			}
		}, 1000);
	}

	// Reset the countdown timer
	export function resetTimer(): void {
		clearInterval(countdownInterval);
		countdown = 10 + 2.5*backoff;
		backoff++;
		showExternalIframe = false;
		startCountdown();
	}

	function escape(): void {
		resetTimer();
		showExternalIframe = false;
	}

	// Load the current video into the video player
	function loadCurrentVideo(): void {
		if (videoElement) {
			videoElement.src = currentVideo.url; // Load local video file
			videoElement.play();
		}
	}

	let touchStartY: number = 0;
	let scrollTimeout: ReturnType<typeof setTimeout>;
	let isScrolling: boolean = false;

	function handleScroll(event: WheelEvent | TouchEvent): void {
		if (isScrolling) return;
		isScrolling = true;

		clearTimeout(scrollTimeout);

		if (event instanceof WheelEvent) {
			if (event.deltaY > 20) {
				nextVideo();
			} else if (event.deltaY < -20) {
				prevVideo();
			}
		}

		scrollTimeout = setTimeout(() => {
			isScrolling = false;
		}, 250);
	}

	function handleTouchStart(event: TouchEvent): void {
		touchStartY = event.touches[0].clientY;
	}

	function handleTouchEnd(event: TouchEvent): void {
		const touchEndY = event.changedTouches[0].clientY;
		const deltaY = touchStartY - touchEndY;

		const threshold = 50;

		if (Math.abs(deltaY) > threshold) {
			if (deltaY > 0) {
				nextVideo();
			} else {
				prevVideo();
			}
		}
	}

	onMount(() => {
		window.addEventListener('wheel', handleScroll, { passive: true });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });

		// Start countdown and reset watch history on mount
		startCountdown();
		resetWatchHistory();

		return () => {
			window.removeEventListener('wheel', handleScroll);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<main class="video-short">
	<div class="navigation">'
		<div id="rightButtons"><EmojiButtons currentVideo={currentVideo} resetTimer={resetTimer} /></div>
		<div>
		<video
			bind:this={videoElement}
			title="Medication"
			class="video-player"
			src={currentVideo?.url ?? ''} 
			playsinline
			controls
			autoplay
			on:ended={loadCurrentVideo}
		></video></div>
		<div id="rightButtons"><NavButtons {prevVideo} {nextVideo} /></div>
	</div>

	{#if showExternalIframe}
		<Overlay buttonClick={escape} />
	{/if}
</main>

<style>
	.video-short {
		text-align: center;
		padding: 20px;
	}

	.video-player {
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

	/* iframe {
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
	} */
</style>