export type JsxError = {
  name: string;
  message: string;
};

export type Success<T> = {
  isSuccess: true;
  value: T;
};

export type Failure<E extends JsxError> = {
  isSuccess: false;
  error: E;
};

export type Result<T, E extends JsxError> = Success<T> | Failure<E>;
