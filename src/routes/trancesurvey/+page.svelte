<script lang="ts">
	import { goto } from "$app/navigation";

    let satisfaction : number = 0;
    let negativeEmotionFrequency = '';

    // Evaluate function to ensure both questions are answered
    function evaluate() {
      if (satisfaction && negativeEmotionFrequency) {
        console.log('Survey Submitted:');
        console.log('Satisfaction:', satisfaction);
        console.log('Negative Emotion Frequency:', negativeEmotionFrequency);
        if (satisfaction > 1 && negativeEmotionFrequency == "0-3 times") {
            goto("/tranceend")
        } else {
            goto("/trancecontinue")
        }
      } else {
        alert('Please answer all questions.');
      }
    }
  
    // Helper to set the satisfaction rating based on star clicked
    function setSatisfaction(value : number) {
      satisfaction = value;
    }
  </script>
  
  <main class="survey-container">
    <h1>Patient satisfaction survey</h1>
  
    <!-- Question 1: Satisfaction with experience -->
    <div class="question">
      <label>How satisfied are you with the Trance™ experience so far?</label>
      <div class="stars">
        {#each Array(5) as _, i}
          <span
            class="star {satisfaction >= i + 1 ? 'filled' : ''}"
            on:click={() => setSatisfaction(i + 1)}
          >
            ★
          </span>
        {/each}
      </div>
    </div>
  
    <!-- Question 2: Negative emotion frequency -->
    <div class="question">
      <label>How many times have you experienced a negative emotion in the past week?</label>
      <select bind:value={negativeEmotionFrequency}>
        <option value="" disabled selected>Select an option</option>
        <option value="0-3 times">0-3 times</option>
        <option value="4-10 times">4-10 times</option>
        <option value="10+ times">10+ times</option>
      </select>
    </div>
  
    <!-- Submit Button -->
    <button on:click={evaluate}>Submit Survey</button>
  </main>
  
  <style>
    .survey-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    .question {
      margin-bottom: 1.5rem;
    }
    .stars {
      display: flex;
      gap: 0.5rem;
    }
    .star {
      font-size: 2rem;
      cursor: pointer;
      color: gray;
    }
    .filled {
      color: gold;
    }
    select {
      display: block;
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      margin-top: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: #007acc;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
  </style>