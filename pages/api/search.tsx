import { MicroCMSQueries } from "microcms-js-sdk"
import { NextApiResponse, NextApiRequest } from "next"
import { client } from "../../libs/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q }: MicroCMSQueries = req.query
  const result = await client.get({
    endpoint: "blog",
    queries: { q },
  })
  res.json(result)
}
