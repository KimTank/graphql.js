import { request as Request } from "@octokit/request";
import { graphql as ApiInterface, Query, RequestParameters } from "./types";
import { graphql } from "./graphql";

export function withDefaults(
  request: typeof Request,
  newDefaults: RequestParameters
): ApiInterface {
  const newRequest = request.defaults(newDefaults);
  const newApi = <ResponseData>(
    query: Query | RequestParameters,
    options?: RequestParameters
  ) => {
    return graphql<ResponseData>(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: newRequest.endpoint,
  });
}
