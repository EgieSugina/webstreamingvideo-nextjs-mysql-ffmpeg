const { DataTypes } = require("sequelize"); //digunakan untuk mendefinisikan tipe data kolom dalam model Sequelize.

import sequelize from "../sequelize";

const Model = sequelize.define(
  "genres",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true // Kolom ini memiliki tipe data INTEGER dan ditandai sebagai primaryKey, 
                      // yang berarti ini adalah kolom kunci utama tabel.
    },
    name: {
      type: DataTypes.INTEGER
    },
      },
  {
    timestamps: false,
    freezeTableName: true //Bagian ini adalah opsi opsional yang diberikan kepada model. 
							// Dalam contoh ini, opsi ini menonaktifkan pencatatan waktu (timestamps) otomatis yang 
							// disediakan oleh Sequelize dengan memberikan nilai false pada timestamps, 
							// dan mengunci nama tabel ke nama yang telah diberikan dalam definisi model 
							// dengan memberikan nilai true pada freezeTableName
  }
);
export default Model; //model yang telah didefinisikan diekspor sebagai default dari modul ini
