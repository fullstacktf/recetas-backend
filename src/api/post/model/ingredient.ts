import { ObjectId } from 'mongodb';
import { Document, model, Model, Schema } from 'mongoose';
import { AllergenModel } from './allergen';

export interface IngredientModel extends Document {
  name: string;
  allergen: [AllergenModel];
}

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  allergen: { type: Schema.Types.Mixed }
});

export const Ingredient: Model<IngredientModel> = model<IngredientModel>('ingredient', IngredientSchema);
