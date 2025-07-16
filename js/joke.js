document.addEventListener('DOMContentLoaded', () => {
  const jokeBtn = document.getElementById('get-joke');
  const jokeDisplay = document.getElementById('joke-display');

  const getJoke = async () => {
    jokeDisplay.innerHTML = 'Serving wit...';

    try {
      // Using Misc, Dark, Pun — sassy vibes, and filtered out boring ones
      const response = await fetch('https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun?type=twopart&blacklistFlags=nsfw,religious,political,racist,sexist,explicit');

      const data = await response.json();

      if (data.error) {
        jokeDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
      } else if (data.type === 'twopart') {
        jokeDisplay.innerHTML = `
          <p><strong>${data.setup}</strong></p>
          <p>${data.delivery}</p>
        `;
      } else {
        jokeDisplay.innerHTML = `<p>${data.joke}</p>`;
      }
    } catch (error) {
      jokeDisplay.innerHTML = `<p>Oops! Couldn't load a sassy joke. Try again.</p>`;
      console.error('Error fetching joke:', error);
    }
  };

  jokeBtn.addEventListener('click', getJoke);
});

let currentJokeText = ''; // Store joke for sharing

// Like button
document.getElementById('like-btn').addEventListener('click', () => {
  alert('😂 Glad you liked it!');
});

// Meh button
document.getElementById('meh-btn').addEventListener('click', () => {
  alert('😶 Not every joke lands...');
});

// Share button
document.getElementById('share-btn').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Check out this joke!',
        text: currentJokeText,
        url: window.location.href
      });
    } catch (err) {
      alert('Share canceled or failed.');
    }
  } else {
    // Fallback if share API is not supported
    navigator.clipboard.writeText(currentJokeText);
    alert('Joke copied to clipboard!');
  }
});
