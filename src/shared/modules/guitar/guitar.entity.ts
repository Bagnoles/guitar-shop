import { defaultClasses, modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { Guitar } from "../../types/guitar.type.js";
import { GuitarTypes } from "../../types/guitar-types.enum.js";
import { now } from "mongoose";

@modelOptions({
    schemaOptions: {
      collection: 'guitars',
      timestamps: true,
    }
})
export class GuitarEntity extends defaultClasses.TimeStamps implements Guitar {
    @prop({ required: true })
    name: string;

    @prop({default: now()})
    date: string;

    @prop({ required: true })
    photo: string;

    @prop({ required: true, enum: GuitarTypes })
    type: GuitarTypes;

    @prop({ required: true })
    article: string;

    @prop({ required: true })
    stringsCount: number;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    description: string;
}

export const GuitarModel = getModelForClass(GuitarEntity);