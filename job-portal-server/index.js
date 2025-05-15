const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://job-portal-605c1.web.app',
  'https://job-portal-605c1.firebaseapp.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  
  if(!token){
    return res.status(401).send({message: 'unAuthorized access'});
  }

  //varify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message: 'unAuthorized access'});
    }

    req.user = decoded;
    next();
  })
  
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkpltdq.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // jobs related apis
    const jobsCollection = client.db('JobPortal').collection('jobs');
    const jobApplicationCollection = client.db('JobPortal').collection('job_applications');

    // Auth related API's
    // token create
    app.post('/jwt', (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '5h'})
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV=== 'production',
            }).send({success: true})
    })

    //token remove
    app.post('/logout', (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV=== 'production'
        }).send({success: true})
    })

    //jobs related APIs
    app.get('/jobs', async(req, res) => {
        // this part will show the posted job application
        // according to person email
        const email = req.query.email;
        let query = {};
        if(email){
          query = {hr_email: email}
        }
        // then find(query) and end of the specific part
        const cursor = jobsCollection.find(query);
        const result = await cursor.toArray();
        // Ensure 'requirements' is always an array
        const filteredJobs = result.filter(job => Array.isArray(job.requirements));
        res.send(filteredJobs);
    })

    // 1. goto router.jsx and declare a loader path for job details
    // 2. write code here
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await jobsCollection.findOne(query);
      res.send(result);
    })

    //  it handles saving a new job to your MongoDB database.
    app.post('/jobs', async(req, res) => {
      const newJob = req.body;
      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    })

    //job application apis
    //get all data, get one data, get some data [0, 1, many]
    app.get('/job-application', verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { applicant_email: email }

      console.log(req.cookies?.token);
      //token email !== query email
      if(req.user.email !== req.query.email){
        return res.status(403).send({message: 'forbidden access'});
      }
      const result = await jobApplicationCollection.find(query).toArray();

      // fokira way to aggregate data
      // for showing applied jobs list on myApplications.jsx
      for(const application of result) {
        console.log(application.job_id)
        const query1 = { _id: new ObjectId(application.job_id)}
        const job = await jobsCollection.findOne(query1);
        if(job) {
          application.title = job.title;
          application.location = job.location;
          application.company = job.company;
          application.company_logo = job.company_logo;
        }
      }

      res.send(result);
    })
    
    app.get('/job-applications/jobs/:job_id', async (req, res) => {
      const jobId = req.params.job_id; // used in all /:id related path
      const query = { job_id: jobId }
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/job-applications', async(req, res) => {
      const application = req.body;
      const result = await jobApplicationCollection.insertOne(application);
      res.send(result);
    })

    // We use the PATCH method when we want to update **part** of a resource (not the entire thing).
    // In this case, we only want to update the 'status'
    // go to viewDetails page
    app.patch('/job-application/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;// This gets the data sent from the frontend
      const filter = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          status: data.status
        }
      }
      const result = await jobApplicationCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Job is falling from the sky');
})

app.listen(port, () => {
    console.log(`Job is waiting at : ${port}`)
})
