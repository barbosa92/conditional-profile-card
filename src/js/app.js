import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Si ambos (name y last) se han completado mostrará, de lo contrario si falta alguno mostrará Lucy Boilett
  let fullname = `<h1>${variables.name} ${variables.lastname}</h1>`;
  if (variables.name == null || variables.lastname == null)
    fullname = "<h1>Lucy Boilett</h1>";

  // Comprueba que role este definido
  let job = `<h2>${variables.role}</h2>`;
  if (variables.role == null) job = "<h2></h2>";

  // Comprueba que city y country se hayan completado
  let place = `<h3>${variables.city}, ${variables.country}<h3/>`;
  if (variables.city == null || variables.country == null) place = "<h3></h3>";

  //Comprueba en que luegar se desea mostrar las redes sociales
  let socialBar = `${variables.socialMediaPosition}`;

  // Comprueba que se añadan RRSS, de lo contrario asigna la URL de 4GeeksAcademy
  let twit = `<li><a href="https://twitter.com/${variables.twitter}"><i class="fa-brands fa-twitter"></i></a></li>`;
  if (variables.twitter == null)
    twit = `<li><a href="https://twitter.com/4GeeksAcademyES"><i class="fa-brands fa-twitter"></i></a></li>`;

  let git = `<li><a href="https://github.com/${variables.github}"><i class="fa-brands fa-github"></i></a></li>`;
  if (variables.github == null)
    git = `<li><a href="https://github.com/alesanchezr"><i class="fa-brands fa-github"></i></a></li>`;

  let link = `<li><a href="https://www.linkedin.com/in/${variables.linkedin}"><i class="fa-brands fa-linkedin-in"></i></a></li>`;
  if (variables.linkedin == null)
    link = `<li><a href="https://linkedin.com/albert-einstein-659129207"><i class="fa-brands fa-linkedin-in"></i></a></li>`;

  let inst = `<li><a href="https://instagram.com/${variables.instagram}"><i class="fa-brands fa-instagram"></i></a></li>`;
  if (variables.instagram == null)
    inst = `<li><a href="https://instagram.com/4geeksacademyes"><i class="fa-brands fa-instagram"></i></a></li>`;

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
            ${fullname}
            ${job}
            ${place}
          <ul class=${socialBar}>
            ${twit}
            ${git}
            ${link}
            ${inst}
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
