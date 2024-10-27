 <script lang="ts">
    export let buttonClick;
 </script>
 
 <main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="overlay" id="disease" on:click={buttonClick}>
        <button id="escape">Escape</button>
        <h1>William D. Elias-Mitchell Obituary</h1>
        <p>
          Will Elias-Mitchell passed away unexpectedly Wednesday, May 22, 2024, at Aurora Medical Center in Grafton. He was 22 years old.
          William was born in Hartford on December 4, 2001, son of Bryan Mitchell and Tabitha Elias. He attended schools in the Port Washington-Saukville area and excelled in sports. Will played on youth teams for Port Washington Soccer Club and Port Washington Youth Baseball, and continued to play while he attended Port Washington High School. Following his sophomore year, Will transferred to Slinger High School, where he graduated with the Class of 2020.
    
          Following school, Will took a position with Mr. Mover in Saukville. He enjoyed his work and the people he worked with. In his down-time, Will liked to go fishing and work on his car.
        </p>
    </div>
 </main>   

 <style>.overlay {
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
    position: absolute;
    right: auto;
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
