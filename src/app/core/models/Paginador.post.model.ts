import { PostModel } from "./Post.model";

export class PaginadorPostModel{
    totalRegistros: number = 0;
    registros: PostModel[] = [];
}