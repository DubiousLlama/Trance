<script>
  import { ChevronUp, ChevronDown } from 'lucide-svelte';

  export let prevVideo = () => {};
  export let nextVideo = () => {};
</script>

<div class="nav-container">
  <!-- Up/Previous Button -->
  <button
    class="nav-button"
    on:click={prevVideo}
    aria-label="Previous video"
  >
    <ChevronUp size={32} color="black" />
  </button>

  <!-- Down/Next Button -->
  <button
    class="nav-button"
    on:click={nextVideo}
    aria-label="Next video"
  >
    <ChevronDown size={32} color="black" />
  </button>
</div>

<style>
  .nav-container {
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    pointer-events: auto;
  }

  .nav-button {
    width: 48px;
    height: 48px;
    padding: 1rem;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .nav-button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>