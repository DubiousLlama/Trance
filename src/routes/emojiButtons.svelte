<script lang="ts">
  import { Video } from '$lib/reccomend';
  export let resetTimer = () => {};
  export let currentVideo: Video;

  // Emoji button labels and image mappings
  const buttonImages = [
    { 
      label: 'like', 
      defaultImage: 'noun-thumb-up-7216141.png',
      selected: 'red-noun-thumb-up-7216141.png'
    },
    { 
      label: 'love', 
      defaultImage: 'noun-heart-275169.png',
      selected: 'red-noun-heart-275169.png'
    },
    { 
      label: 'haha', 
      defaultImage: 'noun-laugh-7196871.png',
      selected: 'red-noun-laugh-7196871.png'
    },
    { 
      label: 'wow', 
      defaultImage: 'noun-wow-2546518.png',
      selected: 'red-noun-wow-2546518.png'
    },
    { 
      label: 'angry', 
      defaultImage: 'noun-anger-4437899.png',
      selected: 'red-noun-anger-4437899.png'
    }
  ];

  // Keep track of which button was physically clicked
  let clickedButton: string | null = null;

  function selectButton(label: string) {
    clickedButton = label;
    resetTimer();
    currentVideo.react(label);
    currentVideo = currentVideo;
  }

  // Reset clicked state when animation ends
  function handleAnimationEnd(label: string) {
    if (clickedButton === label) {
      clickedButton = null;
    }
  }
</script>

<style>
  .button-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  .button:hover {
    transform: scale(1.1);
  }

  .button img {
    width: 100%;
  }

  /* Animation for button click */
  @keyframes popAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .button.clicked {
    animation: popAnimation 0.3s ease;
  }
</style>

<div class="button-column">
  {#each buttonImages as { label, defaultImage, selected }}
    <button
      class="button"
      class:clicked={clickedButton === label}
      on:click={() => selectButton(label)}
      on:animationend={() => handleAnimationEnd(label)}
    >
      <img 
        src={currentVideo.reaction === label ? selected : defaultImage} 
        alt={label}
      />
    </button>
  {/each}
</div>