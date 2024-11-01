<script>
	import { resetWatchHistory } from "$lib/reccomend";
    import {goto} from '$app/navigation'

    function cont() {
        resetWatchHistory();
        goto('/live');
    }
</script>
  
  <main class="survey-container">
    <h1>Treatment instructions</h1>
  
    <!-- Question 1: Satisfaction with experience -->
    <div class="question">
      <label>We are dissapointed to hear that Trance™ has not yet been effective for you.</label>
      <label>While most of our patients report substantial reductions in feelings within a few weeks, some cases pf greif are more persistent.</label>
    </div>
  
    <!-- Question 2: Negative emotion frequency -->
    <div class="question">
      <label>Your doctor has increased your perscription. Please scroll 5-6 times per minute while symptomps persist.</label>
    </div>
  
    <!-- Submit Button -->
    <button on:click={cont}>Continue treatment</button>
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