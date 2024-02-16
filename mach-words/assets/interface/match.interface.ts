export interface Categoria {
    id: number;
    categoria: string;
    options: { id: number; pt: string; en: string }[];
}

export interface Objeto {
    categorias: Categoria[];
}