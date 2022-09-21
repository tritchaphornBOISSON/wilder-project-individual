import { getErrorMessage } from "../utils";

export const WILDERS_PATH = "/wilders";

export enum HTTPVerb {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const query = async (
  url: string,
  method: HTTPVerb,
  body?: Record<string, unknown>
): Promise<any> => {
  let httpStatusError = false;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify(body) }),
    });
    const message = await response.json();
    if (!response.ok) {
      httpStatusError = true;
      throw Error(message.error);
    }
    return message;
  } catch (error) {
    if (httpStatusError) {
      throw Error(getErrorMessage(error));
    }
    throw Error(
      "Impossible to connect to the server, please verify your internet connection."
    );
  }
};
