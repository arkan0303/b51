const dataCard = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.npoint.io/fbb3b5409062ff4cd2d5", true);

  xhr.onload = () => {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Error Data Loading");
    }
  };

  xhr.onerror = () => {
    reject("Network Error");
  };

  xhr.send();
});

function html(kerangka) {
  return `
      <div class="testimonial">
      <img
        src="${kerangka.image}"
        class="profile-testimonial"
      />
      <p class="quote">
        ${kerangka.quote}
      </p>
      <p class="author">- ${kerangka.author}</p>
      <p class="author">${kerangka.rating}<i class="fa-solid fa-star"></i> </p>
    </div>
      `;
}

async function allTestimonials() {
  try {
    const response = await dataCard;
    console.log(response);
    let testimonials = "";
    response.forEach((data) => {
      testimonials += html(data);
    });
    document.getElementById("card-testimonials").innerHTML = testimonials;
  } catch (Error) {
    console.log(error);
  }
}
allTestimonials();

async function cardFiltered(rating) {
  const response = await dataCard;
  let testimonials = "";
  const filtered = response.filter((item) => {
    return item.rating == rating;
  });

  if (filtered == 0) {
    testimonials += `<h1> Data Not Found </h1>`;
  } else
    filtered.forEach((dataBAru) => {
      testimonials += html(dataBAru);
    });

  document.getElementById("card-testimonials").innerHTML = testimonials;
}
