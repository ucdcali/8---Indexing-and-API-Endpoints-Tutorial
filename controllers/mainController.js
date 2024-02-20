import Student from '../Models/Student.js';

export const home = async (req, res) => {
  res.render('index');
};

export const getStudents = async (req, res) => {
  const { name, minGPA, maxGPA, grade, cool } = req.body;
  console.log(req.body);
  // Start with an empty query object
  let query = {};

  // Add GPA range to the query if minGPA and maxGPA are provided
  if (minGPA !== undefined && maxGPA !== undefined) {
    query.gpa = { $gte: parseFloat(minGPA), $lte: parseFloat(maxGPA) };
  }

  // Add name to the query if provided
  if (name) {
    query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  }

  // Add grade to the query if provided
  if (grade && grade !== 'All') {
    query.grade = grade;
  }

  // Add status to the query if provided
  if (cool && cool !== 'All') {
    query.cool = cool;
  }

  console.log(query);

  try {
    const students = await Student.find(query).sort({gpa: -1});
    res.json(students); // Send back JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send(error);
  }
};