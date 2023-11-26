"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "projects",
      [
        {
          title: "pemograman terbaru",
          start_date: "2023-10-11",
          end_date: "2023-11-10",
          description: "siapkan diri anda wahai programmers",
          technologies: ["node-js", "golang", "react", "java"],
          image: "bg.jpg",
          author: "Arkanul Adelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Tahun dimana golang hits",
          start_date: "2023-10-11",
          end_date: "2023-11-10",
          description: "bahaa pemograman ini pernah hits",
          technologies: ["node-js", "golang", "react", "java"],
          image: "bg4.jpg",
          author: "Arkanul Adelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "pemograman ini jarang dipake",
          start_date: "2023-10-11",
          end_date: "2023-11-10",
          description: "Hampir punah karna kurang peminatnya",
          technologies: ["node-js", "golang", "react", "java"],
          image: "bg2.jpg",
          author: "Arkanul Adelis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
