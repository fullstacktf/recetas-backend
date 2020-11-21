import { ObjectId } from 'mongodb';

export interface Post {
  owner: {
    _id: ObjectId;
    username: string;
	}
  name: string;
  description: string;
  time: number;
  servings: number;
  ingredients: [Ingredient];
  steps: [string];
  creation: Date;
  likes: number;
  comments: number;
  tags: [string];
}

export interface Ingredient {
	name: string;
	allergen: [Allergen];
}

export interface Allergen {
  name: string;
}
