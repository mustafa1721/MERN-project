const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');

mongoose.connect(`mongodb+srv://mustafa:admin@atlascluster.hmu5mlh.mongodb.net/mern-project`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connection successful!')).catch(err => {
    console.log(`Error occurred while connecting DB : ${err}`);
  });
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
