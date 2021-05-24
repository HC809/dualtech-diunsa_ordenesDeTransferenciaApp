export interface ILoadingResponse {
  loading: boolean;
  wasSuccessfull: boolean;
  msgError: string;
}

export interface IUILoading {
  submitLoading: ILoadingResponse;
  validarvalidateOTLoading: ILoadingResponse;
  cantidadSugeridaLoading: ILoadingResponse;
  deleteLoading: ILoadingResponse;
}
