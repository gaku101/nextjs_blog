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
          `https://assets.imgix.net/~text?txtsize=32&txt-color=001133&w=${
            width - 80
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=150`}
        media='(min-width: 1400px)'
        type='image/webp'
      />
      <source
        srcSet={`${baseImageUrl}?w=${width * 0.8}&h=${
          height * 0.8
        }}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=20&txt-color=001133&w=${
            width - 180
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=80`}
        media='(min-width: 1024px)'
        type='image/webp'
      />
      <source
        srcSet={`${baseImageUrl}?w=${width * 0.6}&h=${
          height * 0.6
        }}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=16&txt-color=001133&w=${
            width - 240
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=10&blend-y=70`}
        media='(min-width: 768px)'
        type='image/webp'
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={className}
        src={`${baseImageUrl}?w=${width * 0.55}&h=${
          height * 0.55
        }}&blend64=${base64url(
          `https://assets.imgix.net/~text?txtsize=12&txt-color=001133&w=${
            width - 280
          }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
            title
          )}`
        )}&blend-mode=normal&blend-align=top,left&blend-x=10&blend-y=70`}
        alt={title}
      />
    </picture>
  )
}
