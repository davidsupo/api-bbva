const pgp = require("pg-promise")();
//const cn = "postgres://postgres:R1894@localhost:5432/cima";
// const cn = "postgres://postgres:root@localhost:5432/cimabackup";
const cn = "postgres://postgres:root@localhost:5432/bbva_hackaton";

const db = pgp(cn);

module.exports = db;
