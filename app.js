const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set stastic file server
app.use(express.static("src/assets"));

// parsing data form client
app.use(express.urlencoded({ extended: false }));

const dataDummy = [];

// routing
app.get("/", (req, res) => {
  res.render("index", { dataDummy });
});
app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/add-project", (req, res) => {
  res.render("project");
});

//detail
app.get("/detail-project/:id", (req, res) => {
  const { id } = req.params;

  const dataCard = dataDummy[parseInt(id)];

  res.render("detail", { dataDummy: dataCard });
});
// post project
app.post("/add-project", (req, res) => {
  const { title, startDate, endDate, Description, Tecnhologies } = req.body;
  console.log(req.body);

  let startDateValue = new Date(startDate);
  let endDateValue = new Date(endDate);

  let durasiWaktu = endDateValue.getTime() - startDateValue.getTime();
  let durasiHari = durasiWaktu / (1000 * 3600 * 24);
  let durasiMinggu = Math.floor(durasiHari / 7);
  let sisaHari = durasiHari % 7;

  let durasiBulan = Math.floor(durasiHari / 30);
  let sisaHariBulan = durasiHari % 30;

  let durasiTahun = Math.floor(durasiHari / 365);
  let sisaHariTahun = durasiHari % 365;

  let durasiProject = "";

  if (durasiHari <= 6) {
    durasiProject = ` Durasi ${durasiHari + 1} Hari`;
  } else if (durasiTahun > 0) {
    if (sisaHariTahun > 0) {
      durasiProject = `Durasi ${durasiTahun} Tahun ${Math.floor(
        sisaHariTahun / 30
      )} Bulan ${Math.floor(sisaHariTahun % 30)} Hari`;
    } else {
      durasiProject = `Durasi ${durasiTahun} Tahun`;
    }
  } else if (durasiBulan > 0) {
    if (sisaHariBulan > 0) {
      durasiProject = `Durasi ${durasiBulan} Bulan ${sisaHari - 1} Hari`;
    } else {
      durasiProject = `Durasi ${durasiBulan} Bulan`;
    }
  } else if (sisaHari > 0) {
    durasiProject = `Durasi ${durasiMinggu} Minggu ${sisaHari} Hari`;
  } else {
    durasiProject = `Durasi ${durasiMinggu} Minggu`;
  }

  let currentTime = () => {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let month = currentDate.toLocaleString("en-US", { month: "short" });

    return month + " - " + hours + ":" + minutes + ":" + seconds;
  };
  console.log(Tecnhologies);
  const data = {
    title,
    startDate,
    endDate,
    Description,
    Tecnhologies,
    durasiProject,
    postAt: currentTime(),
  };

  dataDummy.unshift(data);
  console.log(dataDummy);
  res.redirect("/");
});

// delete
app.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  dataDummy.splice(id, 1);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// edit view
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  const data = dataDummy[parseInt(id)];
  res.render("edit", { dataDummy: data });
});
// edit post
app.post("/edit/:id", (req, res) => {
  const { id, title, startDate, endDate, Description, Tecnhologies } = req.body;
  console.log("coba", req.body);
});
