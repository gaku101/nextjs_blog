import Link from "next/link"
import { VFC } from "react"

type Props = {
  draftKey?: string
}

export const Preview: React.VFC<Props> = (props) => {
  return (
    <>
      {props.draftKey && (
        <p>
          プレビュー表示がONになっています。
          <Link href={`/api/exitPreview`}>
            <a>プレビュー表示をOFFにする</a>
          </Link>
        </p>
      )}
      {/* 以下に記事内容を表示するコンポーネントが続く */}
    </>
  )
}
