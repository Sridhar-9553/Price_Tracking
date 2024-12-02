const express = require('express');
const app = express();
const multer = require('multer');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors({ origin: 'http://localhost:3000' }));  // Adjust the CORS if deploying to production
app.use(bodyparser.json());

// Set up server and database connection
const PORT = 7000;
const server = require('http').createServer(app);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_details',
});

connection.connect((err) => {
    if (!err) {
        console.log('DB connection succeeded');
    } else {
        console.log(err);
        process.exit(1)
    }
});

// Set up static file serving for images
app.use('/img', express.static(path.join(__dirname, 'img')));

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/image');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

// Multer upload configuration (file validation and size limit)
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }  // Limit file size to 2MB
});

// Signup endpoint
app.post('/signup', (req, res) => {
    connection.query('SELECT * FROM new_user WHERE Email = ?', [req.body.Email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (row.length > 0) {
            return res.status(401).send("User already exists");
        } else {
            const query = 'INSERT INTO new_user (`username`, `Email`, `password`, `Mobile`, `Role`) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [req.body.name, req.body.Email, req.body.password, req.body.mobile, req.body.role], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error', error: err });
                }
                res.status(200).send('User added');
            });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { Email, password } = req.body;
    connection.query('SELECT * FROM new_user WHERE Email = ?', [req.body.Email], (err, row) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }
        if (row.length > 0 && row[0].password === password) {
            res.status(200).send(row);
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});


app.get('/products', (req, res) => {
    const { city, category } = req.query; 


    const validCities = ['Srikakulam', 'Vishakapatnam', 'Rajam', 'Vizainagaram'];
    const validCategories = ['Electronic Gadgets', 'Gold', 'Mens Wear', 'Womens Wear'];

  
    let query = 'SELECT * FROM post_data';
    let queryParams = [];

    
    if (city) {
        if (validCities.includes(city)) {
            query += ' WHERE City = ?';
            queryParams.push(city);
        } else {
            return res.status(400).json({ message: 'Invalid city provided' });
        }
    }

    
    if (category) {
        if (validCategories.includes(category)) {
            
            if (queryParams.length > 0) {
                query += ' AND Category = ?';
            } else {
                query += ' WHERE Category = ?';
            }
            queryParams.push(category);
        } else {
            return res.status(400).json({ message: 'Invalid category provided' });
        }
    }

    connection.query(query, queryParams, (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(rows);
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM new_user WHERE id = ?'; 
    
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);  
        return res.status(500).send('Error fetching user details');
      }
      if (result.length > 0) {
        res.status(200).json(result[0]);  
      } else {
        res.status(404).send('User not found');  
      }
    });
  });
  
app.put('/user/:id',(req, res) => {
    const userId = req.params.id;  
    
    const { name, email, mobile, role } = req.body;  
    const query = `UPDATE new_user SET username = ?, email = ?, mobile = ?, role = ? WHERE id = ?`;
    connection.query(query, [name, email, mobile, role, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error updating profile');
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).send('Profile updated successfully');
      } else {
        return res.status(404).send('User not found');
      }
    });
  });
  


app.post("/post", upload.single("Image"), (req, res) => {
    const { Product_Name, Category, Product_Details, City, Product_Cost } = req.body;
    const image = req.file.filename;

    if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const imagePath = path.join('/img/image', image);

    connection.query('INSERT INTO post_data (Product_Name, Category, Product_Details, City, Product_Cost, Image) VALUES (?, ?, ?, ?, ?, ?)', 
        [Product_Name, Category, Product_Details, City, Product_Cost, imagePath], 
        (err) => {
            if (err) {
                return res.status(500).send('Error saving product data');
            }
            res.status(200).json({
                message: 'Product added successfully',
                product: {
                    Product_Name,
                    Category,
                    Product_Details,
                    City,
                    Product_Cost,
                    Image: imagePath
                }
            });
        });
});


server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
