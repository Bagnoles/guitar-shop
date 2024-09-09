import { defaultClasses, modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { User } from "../../types/user.type.js";
import { CreateUserDto } from "./index.js";
import { createSHA256 } from "../../helpers/common.js";

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
      collection: 'users',
      timestamps: true,
    }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
    @prop({ required: true })
    public name: string;

    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true })
    public password: string;  

    constructor(userData: CreateUserDto) {
        super();
    
        this.name = userData.name;
        this.email = userData.email;
    }

    public setPassword(password: string, salt: string) {
        this.password = createSHA256(password, salt);
    }
    
    public getPassword() {
        return this.password;
    }
    
    public verifyPassword(password: string, salt: string) {
        const hashPassword = createSHA256(password, salt);
        return hashPassword === this.password;
    }

}

export const UserModel = getModelForClass(UserEntity);