export interface ILoadingResponse {
  loading: boolean;
  wasSuccessfull: boolean;
  msgError: string;
}

export interface IUILoading {
  submitLoading: ILoadingResponse;
  deleteLoading: ILoadingResponse;
}
