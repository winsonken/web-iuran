const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const moment = require('moment');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req,res) => {
    const sql = "SELECT * FROM datalaporan";
    db.query(sql, (err,data) => {
        if(err) return res.json("Err");
        return res.json(data);
    })
})

app.get("/data-warga", (req,res) => {
    const sql = "SELECT * FROM datawarga";
    db.query(sql, (err,data) => {
        if(err) return res.json("Err");
        return res.json(data);
    })
})

app.get("/data-petugas", (req,res) => {
    const sql = "SELECT * FROM datapetugas";
    db.query(sql, (err,data) => {
        if(err) return res.json("Err");
        return res.json(data);
    })
})

app.get("/dashboard", (req,res) => {
    const sql = "SELECT * FROM datalaporan WHERE Status = 'On Going'";
    db.query(sql, (err,data) => {
        if(err) return res.json("Err");
        return res.json(data);
    })
})

app.post("/data-warga", (req,res) => {
    const sql = "INSERT INTO datawarga (`KK`, `Nama`, `Alamat`, `Status`) VALUES (?)";
    const values = [
        req.body.kk,
        req.body.nama,
        req.body.alamat,
        req.body.status,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/data-petugas", (req,res) => {
    const sql = "INSERT INTO datapetugas (`ID`, `Password`, `NIK`, `Nama`, `Gender`, `Status`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.pass,
        req.body.nik,
        req.body.nama,
        req.body.gender,
        req.body.status,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/data-warga/:id", (req,res) => {
    const sql = "UPDATE datawarga SET `KK` = ?, `Nama` = ?, `Alamat` = ?, `Status` = ? WHERE ID = ?";
    const values = [
        req.body.kk,
        req.body.nama,
        req.body.alamat,
        req.body.status
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    })
})

app.delete("/deletewarga/:id", (req,res) => {
    const sql = "DELETE FROM datawarga WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/deletepetugas/:id", (req,res) => {
    const sql = "DELETE FROM datapetugas WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/iuran/:bulan/:tahun/:id", (req, res) => {
    const sql = "SELECT * FROM datawarga WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.get("/laporan", (req,res) => {
    const sql = "SELECT * FROM year";
    db.query(sql, (err,data) => {
        if(err) return res.json("Err");
        return res.json(data);
    })
})

app.get("/tahun/:id", (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT m.*
        FROM month m
        JOIN year y ON m.tahun = y.ID
        WHERE y.ID = ?;
    `;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Data retrieved from the database:", data);
        return res.json(data);
    });
});

app.get("/iuran/:bulan/:tahun", (req, res) => {
    const Month = req.params.bulan;
    const Year = req.params.tahun;

    const sql = "SELECT * FROM datalaporan WHERE Month = ? AND Year = ?";

    db.query(sql, [Month, Year], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("SQL Query:", sql);
        return res.json(data);
    });
});

app.put("/iuran/:bulan/:tahun/updateStatus", (req, res) => {
    const Month = req.params.bulan;
    const Year = req.params.tahun;
    
    const updateSql = "UPDATE datalaporan SET `Expired` = 'OVERDUE' WHERE Month = ? AND Year = ? AND Status = 'On Going'";
    
    db.query(updateSql, [Month, Year], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Return the result of the update operation
        return res.json(updateResult);
    });
});

app.put("/iuran/:bulan/:tahun/updateStatusCancel", (req, res) => {
    const Month = req.params.bulan;
    const Year = req.params.tahun;
    
    const updateSql = "UPDATE datalaporan SET `Expired` = 'NONE' WHERE Month = ? AND Year = ? AND Status = 'On Going'";
    
    db.query(updateSql, [Month, Year], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Return the result of the update operation
        return res.json(updateResult);
    });
});

app.post("/iuran/:bulan/:tahun", async (req, res) => {
    try {
        // Retrieve data from datawarga table
        const datawarga = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM datawarga WHERE Status = 'Active'"
            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        // Set common values for Month and Year
        const Month = req.params.bulan;
        const Year = req.params.tahun;
        const NominalValue = "0"; // Change this to your desired year

        // Insert data into datalaporan table
        for (const row of datawarga) {
            const sqlInsert = `
                INSERT INTO datalaporan (KK, Nama, Month, Year, Date, Status, Nominal)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                row.KK,
                row.Nama,
                Month,
                Year,
                null, // Set to your desired default value for Date
                null, // Set to your desired default value for Status
                NominalValue, // Set to your desired default value for Nominal
            ];

            await new Promise((resolve, reject) => {
                db.query(sqlInsert, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        res.json({ success: true, message: "Data inserted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/laporan", (req,res) => {
    const sql = "INSERT INTO year (`ID`, `years`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.years,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/tahun/:id", (req,res) => {
    const ID = req.params.id;
    const sql = "INSERT INTO month (`bulan`, `tahun`) VALUES (?)";
    const values = [
        req.body.month,
        ID,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/iuran/:bulan/:tahun/:id", (req,res) => {
    const sql = "UPDATE datalaporan SET `Nama` = ?, `Date` = ?, `Nominal` = ? WHERE ID = ?";
    const values = [
        req.body.nama,
        req.body.date,
        req.body.nominal
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    })
})

app.get("/iuran/:bulan/:tahun/:id", (req, res) => {
    const sql = "SELECT * FROM datalaporan WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.delete("/deletelaporan/:id", (req,res) => {
    const sql = "DELETE FROM datalaporan WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/deletebulan/:id", (req,res) => {
    const sql = "DELETE FROM month WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/deletetahun/:id", (req,res) => {
    const sql = "DELETE FROM year WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8081, () => {
    console.log("listening");
})