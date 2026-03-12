import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

export const SiteQuery = groq`*[_type == "site"][0] {
  _id,
  _createdAt,
  _updatedAt,
  ...,
  seo {
    ...,
    metaIcon { ${imageQuery} },
    shareGraphic { ${imageQuery} }
  }
}`
