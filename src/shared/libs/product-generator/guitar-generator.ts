import { mockData } from "../../../mocks/mock-data.js";
import { getRandomItem, generateRandomValue } from "../../helpers/index.js";
import { GuitarTypes } from "../../types/guitar-types.enum.js";
import { Guitar } from "../../types/guitar.type.js";
import { ProductGenerator } from "./product-generator.interface.js";


export class GuitarGenerator implements ProductGenerator {
    constructor (
        private initialData = mockData
    ) {}

    private generateItem(): Guitar {
        return {
            name: getRandomItem(this.initialData.names),
            date: new Date().toISOString(),
            photo: getRandomItem(this.initialData.photos),
            type: getRandomItem(Object.values(GuitarTypes)),
            article: getRandomItem(this.initialData.articles),
            stringsCount: getRandomItem(this.initialData.stringsCount),
            price: generateRandomValue(100, 1000000),
            description: getRandomItem(this.initialData.descriptions)
        };
    }

    public generate(amount: number): Guitar[] {
        return Array.from({length: amount}, this.generateItem.bind(this));
    }
}