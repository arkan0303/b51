const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const port = 5000;
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middleware/upload");

//setup hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
hbs.registerHelper("arrayIncludes", function (array, value) {
  return array.includes(value);
});

// connection database
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const { error } = require("console");
const sequelize = new Sequelize(config.development);

// set stastic file server
app.use(express.static("src/assets"));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// parsing data form client
app.use(express.urlencoded({ extended: false }));

//setup flash
app.use(flash());
//setup session express
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new session.MemoryStore(),
    save: true,
    resave: false,
    secret: "Arkanul Adelis",
  })
);

// setup createdAt
let currentTime = () => {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let month = currentDate.toLocaleString("en-US", { month: "short" });

  return month + " - " + hours + ":" + minutes + ":" + seconds;
};

// routing
app.get("/home", async (req, res) => {
  try {
    const query = `SELECT projects.*, users.name AS authorName
    FROM projects
    LEFT JOIN users ON projects.authorid = users.id;    
    `;
    let projects = await sequelize.query(query, { type: QueryTypes.SELECT });
    projects = projects.map((project) => {
      let startDateValue = new Date(project.start_date);
      let endDateValue = new Date(project.end_date);

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

      if (req.session.idUser === project.authorid) {
        project.isOwner = true;
      } else {
        project.isOwner = false;
      }

      project.durasiProject = durasiProject;
      project.createdAt = currentTime();
      project.isLogin = req.session.isLogin;
      return project;
    });
    console.log("req session", req.session.idUser);

    res.render("index", {
      dataDummy: projects,
      isLogin: req.session.isLogin,
      user: req.session.user,
      idUser: req.session.idUser,
    });
  } catch (error) {
    console.log("catc", error);
  }
});
app.get("/testimonial", (req, res) => {
  res.render("testimonial", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
});
app.get("/add-project", (req, res) => {
  res.render("project", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
});

// post project
app.post("/add-project", upload.single("image"), async (req, res) => {
  try {
    const { title, start_date, end_date, description, technologies } = req.body;
    const idUser = req.session.idUser;

    console.log("req body", req.body);
    const image = req.file.filename;

    const query = `INSERT INTO public.projects (title, start_date, end_date, description, technologies, image, authorid, "createdAt", "updatedAt") VALUES ('${title}', '${start_date}', '${end_date}', '${description}','{${technologies}}', '${image}', ${idUser}, NOW(), NOW())`;

    let obj = await sequelize.query(query, { type: QueryTypes.INSERT });
    console.log("post", obj);
    res.redirect("/home");
  } catch (error) {
    console.log("ini error", error);
  }
});

//detail
app.get("/detail-project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT projects.*, users.name as authorname
    FROM projects
    JOIN users ON projects.authorid = users.id
    WHERE projects.id = ${id}
  `;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    let projects = obj.map((project) => {
      let startDateValue = new Date(project.start_date);
      let endDateValue = new Date(project.end_date);

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
          durasiProject = `Durasi - ${durasiTahun} - Tahun - ${Math.floor(
            sisaHariTahun / 30
          )} Bulan ${Math.floor(sisaHariTahun % 30)} Hari`;
        } else {
          durasiProject = `Durasi - ${durasiTahun} - Tahun`;
        }
      } else if (durasiBulan > 0) {
        if (sisaHariBulan > 0) {
          durasiProject = `Durasi - ${durasiBulan} - Bulan - ${
            sisaHari - 1
          } - Hari`;
        } else {
          durasiProject = `Durasi - ${durasiBulan} - Bulan`;
        }
      } else if (sisaHari > 0) {
        durasiProject = `Durasi - ${durasiMinggu} - Minggu - ${sisaHari} - Hari`;
      } else {
        durasiProject = `Durasi - ${durasiMinggu} - Minggu`;
      }

      project.durasiProject = durasiProject;
      project.createdAt = currentTime();
      return project;
    });

    console.log("detail", obj);
    res.render("detail", {
      dataDummy: projects[0],
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (error) {
    console.log("detail", error);
  }
});

// delete
app.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let obj = await sequelize.query(`DELETE FROM projects WHERE id=` + id);
    console.log("delete", obj);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

// edit view
app.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = await sequelize.query(
      `SELECT id, title, start_date, end_date, description, technologies, image, authorid, "createdAt", "updatedAt" FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const data = obj[0];
    data.start_date = data.start_date.toISOString().split("T")[0];
    data.end_date = data.end_date.toISOString().split("T")[0];
    data.imageUrl = `/uploads/${data.image}`;

    console.log("edit view", data);
    res.render("edit", {
      dataDummy: data,
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (error) {
    console.log("edit", error);
  }
});

// edit post
app.post("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start_date, end_date, description, technologies } = req.body;
    const idUser = req.session.idUser;

    let image;
    if (req.file) {
      image = req.file.filename;
    }
    let query = `
  UPDATE public.projects
  SET title='${title}', start_date='${start_date}', end_date='${end_date}', description='${description}', technologies='{${technologies}}',`;
    if (image) {
      query += `image='${image}', `;
    }
    query += `authorid='${idUser}', "createdAt"=NOW(), "updatedAt"=NOW()
    WHERE id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });

    console.log("update-post", { dataDummy: obj });
    res.redirect("/home");
  } catch (error) {
    console.error("update", error);
  }
});

// registrasi
app.get("/registrasi", (req, res) => {
  res.render("registrasi");
});
app.post("/registrasi", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const users = await bcrypt.hash(password, 10, (error, hashPassword) => {
      const query = `INSERT INTO public.users (name , email , password , "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`;
      sequelize.query(query, { type: QueryTypes.INSERT });
    });

    res.redirect("/login");
  } catch (error) {
    console.log("registrasi", error);
  }
});
// login
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const users = await sequelize.query(query, { type: QueryTypes.SELECT });

    const match = await bcrypt.compare(password, users[0].password);
    if (!match) {
      req.flash("danger", "mohon ulangi, inputan anda ada yang salah !");
      return res.redirect("/login");
    } else {
      req.session.isLogin = true;
      req.session.idUser = users[0].id;
      req.session.user = users[0].name;
      req.flash("success", "login success");
      return res.redirect("/home");
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("logout error", err);
    } else {
      res.redirect("/home");
    }
  });
});
app.get("/", (req, res) => {
  res.render("utama");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
