import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ required: true, unique: true })
  clubName: string;

  @Prop({ required: true, unique: true })
  clubCode: string;

  @Prop({ required: true })
  slogan: string;

  @Prop({ required: true })
  stadium: string;

  @Prop({ requred: true })
  coach: string;

  @Prop({ requred: true })
  logoUri: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: Boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
