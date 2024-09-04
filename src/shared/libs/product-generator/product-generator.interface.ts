import { Guitar } from "../../types/guitar.type.js";

export interface ProductGenerator {
    generate(amount: number): Guitar[];
}