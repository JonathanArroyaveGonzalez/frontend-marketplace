import { ImagenModel } from "./Imagen.model";
import { QualificationModel } from "./Qualification.model";

export class PostIdModel{
    category?: number;
    id?: string;
    description?: string;
    status?: number;
    last_modified_date?:string;
    name?: string;
    price?: number;
    stock?: number;
    creation_date?: string;
    images?: ImagenModel[];
    qualifications?: QualificationModel[][];
}