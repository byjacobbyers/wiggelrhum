import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { routeQuery } from '../objects/route-query'
import { videoQuery } from '../objects/video-query'

export const sectionsQuery = groq`
  sections[] {
    ...,
    _type == 'heroBlock' => {
      ...,
      image { ${imageQuery} },
      video { ${videoQuery} },
      cta { ..., route { ${routeQuery} } }
    },
    _type == 'ctaBlock' => {
      ...,
      cta { ..., route { ${routeQuery} } },
      image { ${imageQuery} }
    },
    _type == 'textBlock' => { ... },
    _type == 'imageBlock' => {
      ...,
      image { ${imageQuery} },
      cta { ..., route { ${routeQuery} } }
    },
    _type == 'faqBlock' => { ..., faqs[] { question, answer } }
  }
`
