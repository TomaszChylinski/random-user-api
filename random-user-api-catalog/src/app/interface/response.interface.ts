export interface Response {
  info: Info;
  results: any[];
}

export interface Info {
  seed: number;
  result: number;
  page: number;
  version: string;
}
