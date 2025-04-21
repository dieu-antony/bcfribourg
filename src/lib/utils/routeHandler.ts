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
  handlers: RouteHandlerParams
) {
  const method = req.method?.toUpperCase() as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    res.setHeader("Allow", Object.keys(handlers).join(", "));
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  try {
    await handler(req, res);
  } catch (error) {
    console.error("Unhandled error in RouteHandler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
