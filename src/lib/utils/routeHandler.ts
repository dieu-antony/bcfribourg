import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RouteHandlerParams {
  GET?: NextApiHandler;
  POST?: NextApiHandler;
  PUT?: NextApiHandler;
  DELETE?: NextApiHandler;
}

export async function RouteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  handlers: RouteHandlerParams,
) {
  const method = req.method as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    return res.status(405).send("Method not allowed");
  }

  return await handler!(req, res);
}
