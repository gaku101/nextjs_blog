declare interface Blog {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
  category: Category
  image: Image
  tags: Tag[]
}
declare interface Tag {
  id: number
  name: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}

declare interface Category {
  id: number
  name: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}

declare interface Image {
  url: string
  height: number
  width: number
}
