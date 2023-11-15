class CardTestimonial {
  constructor(author, quote, image) {
    this.author = author;
    this.quote = quote;
    this.image = image;
  }

  html() {
    return `
        <div class="testimonial">
        <img
          src="${this.image}"
          class="profile-testimonial"
        />
        <p class="quote">
          ${this.quote}
        </p>
        <p class="author">- ${this.author}</p>
      </div>
        `;
  }
}

const dataDummy = [
  {
    author: "Arkanul Adelis",
    quote:
      "duniaku penuh dengan kebetulan, dan kebetulan yang paling aku syukuri adalah bertemu dengan mu ( DUMBWAYS )",
    image: "/src/assets/image/3.jpg",
  },
  {
    author: "Arkanul Adelis",
    quote:
      "Nikmati dulu pahitnya , kamu bukan hancur , kamu sedang berproses. This will make u proud of ur self",
    image: "/src/assets/image/aku.jpg",
  },
  {
    author: "Arkanul Adelis",
    quote: "Tidak usah berbohong ! sorot matamu itu dendam , bukan keikhlasan ",
    image: "/src/assets/image/aku1.jpg",
  },
  {
    author: "Arkanul Adelis",
    quote:
      "Tunjukan pada semua orang bahwa tidak semua orang jahat melakukan hal yang jahat",
    image: "/src/assets/image/4.jpg",
  },
];

const card1 = new CardTestimonial(
  dataDummy[0].author,
  dataDummy[0].quote,
  dataDummy[0].image
);
const card2 = new CardTestimonial(
  dataDummy[1].author,
  dataDummy[1].quote,
  dataDummy[1].image
);
const card3 = new CardTestimonial(
  dataDummy[2].author,
  dataDummy[2].quote,
  dataDummy[2].image
);
const card4 = new CardTestimonial(
  dataDummy[3].author,
  dataDummy[3].quote,
  dataDummy[3].image
);

const testimonials = [card1, card2, card3, card4];

let cardHtml = "";
for (let i = 0; i < testimonials.length; i++) {
  cardHtml += testimonials[i].html();
}

document.getElementById("testimonials").innerHTML = cardHtml;
