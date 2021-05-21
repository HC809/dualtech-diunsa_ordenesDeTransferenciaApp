export interface IProductoForm {
  descripcion: string;
  precio: number;
  tieneInventario: boolean;
  existencia: number;
  activo: boolean;
  sincronizado: boolean;
}

export interface IProducto extends IProductoForm {
  id: string;
}
