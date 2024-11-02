<script lang="ts">
  export let buttonClick;
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="overlay" id="disease" on:click={buttonClick}>
      <h1>Russel Elias-Mitchell Obituary</h1>
      <p>Russel Elias-Mitchell passed away unexpectedly on August 3rd, 2024. He was 22.
        <br>
        <br>
        Russel was known for for his warm smile, deadpan wit, and devotion to family.
        He excelled in sports, and spent four years pitching for the Bearcats.
        When he wasn't in the ballpark, was usually watching a show with friends,
        filling them all in on his latest theories.
        <br>
        <br>
        Russel graduated from Monroe High School in 2021. Afterward, he dedicated himself
         to coaching little league, and found his calling behind the wheel, working as a 
         delivery driver for Amazon. Jake is survived by his parents William Mitchell and 
         Jennifer Elias, brother Andy, and girlfriend Lily.
      </p>
      <button id="escape">Escape</button>
  </div>
</main>   

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 10s forwards ease-in-out;
}

#escape {
  padding: 10px 20px;
  font-size: 36px;
  background-color: #f00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  animation: fadeIn2 1s forwards ease-in; 
}

h1 {
  margin-top: 0px;
}

h3 {
  font-weight: lighter;
}

#disease {
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5%; 
  color: white;
}

#disease p {
  text-align: left;
  width: 80vw;
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