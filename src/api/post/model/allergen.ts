import { Document, model, Model, Schema } from 'mongoose';

export interface AllergenModel extends Document {
  name: string;
}

const AllergenSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }
});

export const Allergen: Model<AllergenModel> = model<AllergenModel>('allergen', AllergenSchema);
