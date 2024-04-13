// Get the HTML elements
const emoji = document.getElementById("emoji");
const delayElem = document.getElementById("delay");

// Parse the URL search parameters
const params = new URL(document.location).searchParams;
// Set the content if the parameter exists
if (params.has("content")) {
  emoji.textContent = params.get("content");
}
// Set the delay if the parameter exists
if (params.has("delay")) {
  delayElem.value = params.get("delay");
}

// Set up an event listener to update the time delay when the input changes
let intervalId;
delayElem.addEventListener("input", updateDelay);
// Set up an event listener to update the content parameter when it is edited
emoji.addEventListener("input", (e) => {
  updateParam("content", emoji.textContent);
});

// Switch the emoji from normal to italic, or italic to normal
function toggleEmoji() {
  let classes = emoji.classList;
  classes.toggle("normal");
  classes.toggle("italic");
}

// Start the dance back and forth
function startDance() {
  intervalId = setInterval(toggleEmoji, delayElem.value, emoji);
}

// When the delay is changed, restart the dance
function updateDelay() {
  clearInterval(intervalId);
  updateParam("delay", delayElem.value);
  startDance();
}

// Update the URL search parameters
function updateParam(name, value) {
  params.set(name, value);
  window.history.replaceState({}, "", `${location.pathname}?${params}`);
}

// Start the dance for the first time
startDance();
