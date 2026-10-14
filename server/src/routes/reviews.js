import { Router } from 'express';
import {
  getAllReviews,
  getReview,
  createReview,
  getTopMeals
} from '../controllers/reviewController.js';

const router = Router();

// TODO: wire up the three routes in README.md section 2 and the summary route in section 3.
// Get all reviews
router.get('/', getAllReviews);

// Create a new review
router.post('/', createReview);

router.get('/top', getTopMeals);

// Get a review by ID
router.get('/:id', getReview);

export default router;
