import mongoose from 'mongoose';
import { Review } from '../models/Review.js';

// GET /api/reviews
// TODO: implement per README.md section 2.
export async function getAllReviews(req, res, next) {
  try {
    // TODO
      const reviews = await Review.find();

    return res.status(200).json({ reviews });
  } catch (err) { next(err); }
}

// GET /api/reviews/:id
// TODO: implement per README.md section 2.
export async function getReview(req, res, next) {
  try {
    // TODO
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid review ID'
      });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: 'Review not found'
      });
    }

    return res.status(200).json({ review });

  } catch (err) { next(err); }
}

// POST /api/reviews
// TODO: implement per README.md section 2.
export async function createReview(req, res, next) {
  try {
    // TODO
    const { mealCode, rating, comment, reviewedBy } = req.body;

    const review = await Review.create({
      mealCode,
      rating,
      comment,
      reviewedBy
    });

    return res.status(201).json({ review });
    
  } catch (err) { next(err); }
}

// GET /api/reviews/summary?mealCode=ML101
// TODO: implement per README.md section 3.

export async function getTopMeals(req, res, next) {
  try {
    const { limit = '5' } = req.query;

    if (
      typeof limit !== 'string' ||
      !/^[0-9]+$/.test(limit) ||
      !Number.isSafeInteger(Number(limit)) ||
      Number(limit) <= 0
    ) {
      return res.status(400).json({
        message: 'limit must be a positive integer'
      });
    }

    const top = await Review.aggregate([
      {
        $group: {
          _id: '$mealCode',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      },
      {
        $sort: {
          averageRating: -1,
          _id: 1
        }
      },
      {
        $limit: Number(limit)
      },
      {
        $project: {
          _id: 0,
          mealCode: '$_id',
          averageRating: 1,
          reviewCount: 1
        }
      }
    ]);

    return res.status(200).json({ top });

  } catch (err) {
    next(err);
  }
}


