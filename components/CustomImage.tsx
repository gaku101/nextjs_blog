import base64url from "base64url"

type Props = {
  baseImageUrl: string
  title: string
  width?: number
  height?: number
  className?: string
}

export const CustomImage: React.VFC<Props> = ({
  baseImageUrl,
  title,
  width = 1200,
  height = 630,
  className,
}) => {
  return (
    <picture>
      <source
        srcSet={`${baseImageUrl}?w=${width}&h=${height}}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=36&txt-color=001133&w=${
            width - 80
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=120`}
        media='(min-width: 1400px)'
        type='image/webp'
      />
      <source
        srcSet={`${baseImageUrl}?w=${width * 0.8}&h=${
          height * 0.8
        }}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=30&txt-color=001133&w=${
            width - 180
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=100`}
        media='(min-width: 1024px)'
        type='image/webp'
      />
      <source
        srcSet={`${baseImageUrl}?w=${width * 0.7}&h=${
          height * 0.7
        }}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=24&txt-color=001133&w=${
            width - 240
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=30&blend-y=90`}
        media='(min-width: 768px)'
        type='image/webp'
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={className}
        src={`${baseImageUrl}?w=${width}&h=${height}}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=36&txt-color=001133&w=${
            width - 30
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=20&blend-y=140`}
        alt={title}
      />
    </picture>
  )
}
