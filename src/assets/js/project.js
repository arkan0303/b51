let dataProject = [];

function addData(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("Description").value;
  let image = document.getElementById("input-image").files;

  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;

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
  console.log(durasiProject);

  //icon
  const golang = `<i class="fa-brands fa-golang"></i>`;
  const java = ` <i class="fa-brands fa-java"></i>`;
  const react = ` <i class="fa-brands fa-react"></i>`;
  const node = `<i class="fa-brands fa-node-js"></i>`;

  //cek kondisi
  let getIcon1 = document.getElementById("node").checked ? node : "";
  let getIcon2 = document.getElementById("java").checked ? java : "";

  let getIcon3 = document.getElementById("golang").checked ? golang : "";
  let getIcon4 = document.getElementById("react").checked ? react : "";

  let currentTime = () => {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let month = currentDate.toLocaleString("en-US", { month: "short" });

    return month + " - " + hours + ":" + minutes + ":" + seconds;
  };

  console.log(currentTime());

  image = URL.createObjectURL(image[0]);

  let project = {
    title,
    startDate,
    endDate,
    durasiProject,
    description,
    image,
    getIcon1,
    getIcon2,
    getIcon3,
    getIcon4,
    postAt: currentTime(),
    author: "Arkanul Adelis",
  };
  dataProject.push(project);
  console.log(dataProject);

  renderProject();
}

function renderProject() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataProject.length; index++) {
    console.log(dataProject[index]);

    document.getElementById("contents").innerHTML += `
    <div class="kelas2">
      <div class="kelas3">
        <img src="${dataProject[index].image}" alt="" />
      </div>
      <div class="elemen">
        <a href="/views/detai.html">${dataProject[index].title}</a>
        <div class="kelas4">
          <p>${dataProject[index].postAt} | ${dataProject[index].durasiProject} | ${dataProject[index].author}</p>
        </div>

        <p class="lorem">
          ${dataProject[index].description}
        </p>
      </div>
      <div class="icon">
        ${dataProject[index].getIcon1}
        ${dataProject[index].getIcon2}
        ${dataProject[index].getIcon3}
        ${dataProject[index].getIcon4}
      </div>

      <div class="kelas5">
        <div class="delete">
          <button>Delete</button>
        </div>
        <div class="edit">
          <button>Edit</button>
        </div>
      </div>
    </div>
    `;
  }
}
