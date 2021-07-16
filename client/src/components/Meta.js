import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name= 'keywords' content={keywords} />
      </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to RC Diamonds',
    description: 'We sell best of jewellery at better price',
    keywords: 'jewellery, cheap jewellery, buy jewellery at affordable price'
}

export default Meta
