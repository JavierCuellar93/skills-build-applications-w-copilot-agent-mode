import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
import { getApiBaseUrl } from '../utils/apiUrl.js';
const router = Router();
const buildPayload = (resource, items) => ({
    resource,
    apiUrl: getApiBaseUrl(),
    items,
});
router.get(['/users', '/users/'], async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(buildPayload('users', users));
});
router.get(['/teams', '/teams/'], async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(buildPayload('teams', teams));
});
router.get(['/activities', '/activities/'], async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(buildPayload('activities', activities));
});
router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).lean();
    res.json(buildPayload('leaderboard', leaderboard));
});
router.get(['/workouts', '/workouts/'], async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(buildPayload('workouts', workouts));
});
export { router as apiRoutes };
