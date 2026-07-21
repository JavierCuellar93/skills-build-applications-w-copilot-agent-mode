import { connectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
console.log('Seed the octofit_db database with test data');
await connectDatabase();
await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
]);
const users = await User.insertMany([
    {
        name: 'Ava Martinez',
        email: 'ava@example.com',
        role: 'Captain',
        fitnessGoal: 'Marathon prep',
        age: 29,
    },
    {
        name: 'Noah Singh',
        email: 'noah@example.com',
        role: 'Runner',
        fitnessGoal: 'Improve endurance',
        age: 31,
    },
    {
        name: 'Mia Chen',
        email: 'mia@example.com',
        role: 'Cyclist',
        fitnessGoal: 'Build strength',
        age: 27,
    },
]);
const teams = await Team.insertMany([
    {
        name: 'North Stars',
        sport: 'Running',
        members: 6,
        captain: 'Ava Martinez',
        status: 'Active',
    },
    {
        name: 'River Runners',
        sport: 'Cycling',
        members: 5,
        captain: 'Noah Singh',
        status: 'Active',
    },
]);
const activities = await Activity.insertMany([
    {
        userName: 'Ava Martinez',
        type: 'Run',
        durationMinutes: 35,
        distanceKm: 6.2,
        calories: 420,
    },
    {
        userName: 'Noah Singh',
        type: 'Strength',
        durationMinutes: 45,
        distanceKm: 0,
        calories: 310,
    },
    {
        userName: 'Mia Chen',
        type: 'Cycle',
        durationMinutes: 50,
        distanceKm: 18,
        calories: 530,
    },
]);
const leaderboard = await LeaderboardEntry.insertMany([
    { name: 'Ava Martinez', score: 980, streak: 8, rank: 1 },
    { name: 'Noah Singh', score: 945, streak: 5, rank: 2 },
    { name: 'Mia Chen', score: 912, streak: 7, rank: 3 },
]);
const workouts = await Workout.insertMany([
    {
        name: 'HIIT Burst',
        focus: 'cardio',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        equipment: ['mat', 'timer'],
    },
    {
        name: 'Core Builder',
        focus: 'strength',
        durationMinutes: 30,
        difficulty: 'Beginner',
        equipment: ['mat'],
    },
]);
console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts.`);
