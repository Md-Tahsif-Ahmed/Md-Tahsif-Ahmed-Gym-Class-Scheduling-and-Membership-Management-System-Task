const User = require('../models/Class');

const createClass = async (req, res) => {
    try {
        const { date, trainerId } = req.body;

        // Ensure max 5 schedules per day
        const classCount = await Class.countDocuments({ date: { $eq: date } });
        if (classCount >= 5) {
            return res.status(400).json({ message: 'Maximum schedules reached for the day' });
        }

        const newClass = new Class({ date, trainer: trainerId,  duration: 2 });
        await newClass.save();
        res.status(201).json({ message: 'Class scheduled successfully', class: newClass });
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling class', error });
    }
};

// get all class
const getAllClasses = async (req, res) => {
    try {
        // Fetch all classes with populated trainer and attendees information
        const classes = await Class.find()
            .populate('trainer', 'email role') // Populate trainer's email and role
            .populate('attendees', 'email role'); // Populate attendees' email and role

        res.status(200).json({
            success: true,
            message: 'Class schedules retrieved successfully',
            data: classes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving class schedules',
            error: error.message,
        });
    }
};

// triner view schedule
const viewSchedule = async (req, res) => {
    try {
        const { id } = req.user; // Trainer's ID from the token
        const classes = await Class.find({ trainer: id });
        res.json({ schedule: classes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error });
    }
};

// class book by trianee
const bookClass = async (req, res) => {
    try {
        const { classId } = req.body;
        const userId = req.user.id;

        // Fetch class details
        const selectedClass = await Class.findById(classId);

        // Check if the class is already full
        if (selectedClass.attendees.length >= 10) {
            return res.status(400).json({ message: 'Class schedule is full. Maximum 10 trainees allowed per schedule."' });
        }

        // Check if the trainee has already booked this class
        if (selectedClass.attendees.includes(userId)) {
            return res.status(400).json({ message: 'You have already booked this class.' });
        }

        // Add trainee to the class
        selectedClass.attendees.push(userId);
        await selectedClass.save();

        res.status(200).json({ message: 'Class booked successfully', class: selectedClass });
    } catch (error) {
        res.status(500).json({ message: 'Error booking class', error: error.message });
    }
};

module.exports = {  viewSchedule, createClass, getAllClasses, bookClass };
