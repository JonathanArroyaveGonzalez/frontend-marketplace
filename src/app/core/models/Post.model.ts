import { ImagenModel } from "./Imagen.model";
import { OrderModel } from "./Order.model";

export class PostModel{
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
    user_id?: string;
    orders?: OrderModel[]
}