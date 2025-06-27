// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/college', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define Schemas and Models
// const teacherSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   password: String,
// });

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   password: String,
// });

// const questionSchema = new mongoose.Schema({
//   subjectCode: String,
//   questionText: String,
//   options: [String],
//   correctAnswer: String,
// });

// const resultSchema = new mongoose.Schema({
//   studentEmail: String,
//   subjectCode: String,
//   score: Number,
// });

// const testSchema = new mongoose.Schema({
//   subjectCode: String,
//   questions: [questionSchema],
//   timer: Number,
// });

// const Test = mongoose.model('Test', testSchema);

// const Question = mongoose.model('Question', questionSchema);
// const Result = mongoose.model('Result', resultSchema);

// const Teacher = mongoose.model('Teacher', teacherSchema);
// const Student = mongoose.model('Student', studentSchema);

// // Serve landing page at the root URL
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Teacher Profile Route
// app.get('/teacher-profile', async (req, res) => {
//   const { email } = req.query;
//   try {
//     const teacher = await Teacher.findOne({ email });
//     res.json(teacher);
//   } catch (error) {
//     res.status(500).send('Error fetching teacher profile');
//   }
// });

// // Student Profile Route
// app.get('/student-profile', async (req, res) => {
//   const { email } = req.query;
//   try {
//     const student = await Student.findOne({ email });
//     res.json(student);
//   } catch (error) {
//     res.status(500).send('Error fetching student profile');
//   }
// });

// // Create Test Route
// // app.post('/create-test', async (req, res) => {
// //   const { subjectCode, questions } = req.body;
// //   try {
// //     await Question.insertMany(questions.map(q => ({ ...q, subjectCode })));
// //     res.status(200).send('Test created successfully');
// //   } catch (error) {
// //     res.status(500).send('Error creating test');
// //   }
// // });


// // Create Test Route
// app.post('/create-test', async (req, res) => {
//   const { subjectCode, questions, timer } = req.body;
//   try {
//     const newTest = new Test({ subjectCode, questions, timer });
//     await newTest.save();
//     res.status(200).send('Test created successfully');
//   } catch (error) {
//     res.status(500).send('Error creating test');
//   }
// });


// // Attempt Test Route
// // app.get('/attempt-test', async (req, res) => {
// //   const { subjectCode } = req.query;
// //   try {
// //     const questions = await Question.find({ subjectCode });
// //     res.json(questions);
// //   } catch (error) {
// //     res.status(500).send('Error fetching test');
// //   }
// // });



// // Attempt Test Route
// // Attempt Test Route
// app.get('/attempt-test', async (req, res) => {
//   const { subjectCode } = req.query;
//   try {
//     const questions = await Question.find({ subjectCode });
//     const timer = 30; // Set the timer duration in minutes here, replace with dynamic value if needed
//     res.json({ questions, timer });
//   } catch (error) {
//     res.status(500).send('Error fetching test');
//   }
// });



// // Submit Test Route
// // app.post('/submit-test', async (req, res) => {
// //   const { studentEmail, subjectCode, answers } = req.body;
// //   try {
// //     const questions = await Question.find({ subjectCode });
// //     let score = 0;
// //     questions.forEach((q, i) => {
// //       if (q.correctAnswer === answers[i]) score++;
// //     });

// //     const result = new Result({ studentEmail, subjectCode, score });
// //     await result.save();

// //     await Question.deleteMany({ subjectCode });  // Remove test questions after submission
// //     res.status(200).send('Test submitted successfully');
// //   } catch (error) {
// //     res.status(500).send('Error submitting test');
// //   }
// // });


// // Submit Test Route
// app.post('/submit-test', async (req, res) => {
//   const { studentEmail, subjectCode, answers } = req.body;
//   try {
//     const questions = await Question.find({ subjectCode });
//     let score = 0;
//     questions.forEach((q, i) => {
//       if (q.correctAnswer === answers[i]) score++;
//     });

//     const result = new Result({ studentEmail, subjectCode, score });
//     await result.save();

//     await Question.deleteMany({ subjectCode });  // Remove test questions after submission
//     res.status(200).send('Test submitted successfully');
//   } catch (error) {
//     res.status(500).send('Error submitting test');
//   }
// });


// // Fetch Results Route
// app.get('/fetch-results', async (req, res) => {
//   const { studentEmail } = req.query;
//   try {
//     const results = await Result.find({ studentEmail });
//     res.json(results);
//   } catch (error) {
//     res.status(500).send('Error fetching results');
//   }
// });

// // Routes for Registration and Login
// app.post('/register', async (req, res) => {
//   const { fullName, email, password, user } = req.body;

//   try {
//     if (user === 'Teacher') {
//       const teacher = new Teacher({ fullName, email, password });
//       await teacher.save();
//     } else if (user === 'Student') {
//       const student = new Student({ fullName, email, password });
//       await student.save();
//     }
//     res.status(200).send('Successfully registered! Please go to the login page.');
//   } catch (error) {
//     res.status(500).send('Error registering user');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password, user } = req.body;

//   try {
//     let foundUser;
//     if (user === 'Teacher') {
//       foundUser = await Teacher.findOne({ email, password });
//       if (foundUser) {
//         res.json({ redirectUrl: '/teacher-dashboard.html', fullName: foundUser.fullName });
//         return;
//       }
//     } else if (user === 'Student') {
//       foundUser = await Student.findOne({ email, password });
//       if (foundUser) {
//         res.json({ redirectUrl: '/student-dashboard.html', fullName: foundUser.fullName });
//         return;
//       }
//     }

//     res.status(401).send('Invalid email or password');
//   } catch (error) {
//     res.status(500).send('Error logging in user');
//   }
// });

// // Server listening
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });





const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyB_QnGwcqng7ukrIAQlD21pSOLRvd4Y-WE");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Define Schemas and Models
const teacherSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const questionSchema = new mongoose.Schema({
  subjectCode: String,
  questionText: String,
  options: [String],
  correctAnswer: String,
});

const resultSchema = new mongoose.Schema({
  studentEmail: String,
  studentName: String,
  subjectCode: String,
  score: Number,
  answers: [String],
});

const Question = mongoose.model('Question', questionSchema);
const Result = mongoose.model('Result', resultSchema);

const Teacher = mongoose.model('Teacher', teacherSchema);
const Student = mongoose.model('Student', studentSchema);

// Serve landing page at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/os', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'os.html'));
});

app.get('/cn', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cn.html'));
});

app.get('/ca', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ca.html'));
});

app.get('/software', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'software.html'));
});

app.get('/dsa', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dsa.html'));
});

app.get('/dbms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dbms.html'));
});

app.get('/ai', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ai.html'));
});

app.get('/cpp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cpp.html'));
});

// Teacher Profile Route
app.get('/teacher-profile', async (req, res) => {
  const { email } = req.query;
  try {
    const teacher = await Teacher.findOne({ email });
    res.json(teacher);
  } catch (error) {
    res.status(500).send('Error fetching teacher profile');
  }
});

// Student Profile Route
app.get('/student-profile', async (req, res) => {
  const { email } = req.query;
  try {
    const student = await Student.findOne({ email });
    res.json(student);
  } catch (error) {
    res.status(500).send('Error fetching student profile');
  }
});

// Create Test Route
app.post('/create-test', async (req, res) => {
  const { subjectCode, questions } = req.body;
  try {
    await Question.insertMany(questions.map(q => ({ ...q, subjectCode })));
    res.status(200).send('Test created successfully');
  } catch (error) {
    res.status(500).send('Error creating test');
  }
});

// Attempt Test Route
app.get('/attempt-test', async (req, res) => {
  const { subjectCode } = req.query;
  try {
    const questions = await Question.find({ subjectCode });
    res.json(questions);
  } catch (error) {
    res.status(500).send('Error fetching test');
  }
});

// Submit Test Route
app.post('/submit-test', async (req, res) => {
  const { studentEmail, studentName, subjectCode, answers } = req.body;
  try {
    const questions = await Question.find({ subjectCode });
    let score = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });

    const result = new Result({ studentEmail, studentName, subjectCode, score, answers });
    await result.save();

    res.status(200).send('Test submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting test');
  }
});

// Fetch Results Route
app.get('/fetch-results', async (req, res) => {
  const { studentEmail } = req.query;
  try {
    const results = await Result.find({ studentEmail });
    res.json(results);
  } catch (error) {
    res.status(500).send('Error fetching results');
  }
});

// Fetch Submitted Answers Route
app.get('/fetch-submitted-answers', async (req, res) => {
  const { subjectCode } = req.query;
  try {
    const results = await Result.find({ subjectCode });
    res.json(results);
  } catch (error) {
    res.status(500).send('Error fetching submitted answers');
  }
});


//upload score
app.post('/upload-score', async (req, res) => {
  const { resultId, score } = req.body;
  try {
    await Result.findByIdAndUpdate(resultId, { score });
    res.status(200).send('Score uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading score');
  }
});



// Routes for Registration and Login
app.post('/register', async (req, res) => {
  const { fullName, email, password, user } = req.body;

  try {
    if (user === 'Teacher') {
      const teacher = new Teacher({ fullName, email, password });
      await teacher.save();
    } else if (user === 'Student') {
      const student = new Student({ fullName, email, password });
      await student.save();
    }
    res.status(200).send('Successfully registered! Please go to the login page.');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password, user } = req.body;

  try {
    let foundUser;
    if (user === 'Teacher') {
      foundUser = await Teacher.findOne({ email, password });
      if (foundUser) {
        res.json({ redirectUrl: '/teacher-dashboard.html', fullName: foundUser.fullName });
        return;
      }
    } else if (user === 'Student') {
      foundUser = await Student.findOne({ email, password });
      if (foundUser) {
        res.json({ redirectUrl: '/student-dashboard.html', fullName: foundUser.fullName });
        return;
      }
    }

    res.status(401).send('Invalid email or password');
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
});


app.post('/api/suggest-mcq', async (req, res) => {
  const { subject } = req.body;

  if (!subject) {
      return res.status(400).json({ error: "Subject name is required" });
  }

  try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a university professor. Please suggest some multiple-choice questions (MCQs) on the subject "${subject}". Include 4 options for each question, and indicate the correct answer.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      res.json({ suggestions: text });
  } catch (error) {
      console.error("Error generating questions:", error);
      res.status(500).json({ error: "Error generating questions" });
  }
});

// Server listening
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
