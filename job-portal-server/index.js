const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());




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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // jobs related apis
    const jobsCollection = client.db('JobPortal').collection('jobs');
    const jobApplicationCollection = client.db('JobPortal').collection('job_applications');

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
        res.send(result);
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
    app.get('/job-application', async (req, res) => {
      const email = req.query.email;
      const query = { applicant_email: email }
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