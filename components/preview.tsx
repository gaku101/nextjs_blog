import Link from "next/link"
import { VFC } from "react"

type Props = {
  draftKey?: string
}
export const Preview: VFC<Props> = (props) => {
  return (
    <>
      {props.draftKey && (
        <p className={"bg-yellow-100 text-yellow-900 p-4 text-center"}>
          {props.draftKey}プレビュー表示がONになっています。
          <Link href={`/api/exitPreview`}>
            <a className={"underline"}>プレビュー表示をOFFにする</a>
          </Link>
        </p>
      )}
      {/* 以下に記事内容を表示するコンポーネントが続く */}
    </>
  )
}
