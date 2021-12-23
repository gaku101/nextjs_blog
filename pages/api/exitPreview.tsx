import { NextApiRequest, NextApiResponse } from "next"

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData()
  res.writeHead(307, { Location: `/` })
  res.end("Preview mode disabled")
}
