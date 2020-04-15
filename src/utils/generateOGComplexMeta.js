export default item => ([
  {
    property: 'og:title',
    content: `${item.title}`
  },
  {
    property: 'og:description',
    content: item.description ? `${item.description}` : ''
  },
  {
    property: 'og:image',
    content: item.image ? `${item.image}` : ''
  },
  {
    property: 'og:type',
    content: 'article'
  },
  {
    property: 'og:url',
    content: ''
  }
])
