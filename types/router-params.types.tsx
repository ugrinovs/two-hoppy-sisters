export type RouterParams<T> = {
  params: T;
};

export type AdminProductPageParams = RouterParams<{ id: string }>;
