function bars(x) {
  x.classList.toggle("toggle-burger");
  let itemsBars = document.getElementById("items-bars");
  if (itemsBars.style.display === "block") {
    itemsBars.style.display = "none";
  } else {
    itemsBars.style.display = "block";
  }
}
