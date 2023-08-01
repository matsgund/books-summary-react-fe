import {PortableText} from '@portabletext/react'
import {PortableTextComponents} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import client from '@/utils/sanityClient';


interface ComponentProps {
    value: any;
    isInline: boolean;
}

interface ImageDimensions {
    width: number;
    height: number;
}

const ImageComponent = ({value, isInline} : ComponentProps) => {
    const {width, height} : ImageDimensions = getImageDimensions(value)
        return (
            <img
            src={urlBuilder(client)
                .image(value)
                .auto('format')
                .url()}
            alt={value.alt || ' '}
            loading="lazy"
            style={{
                display: isInline ? 'inline-block' : 'block',
                maxWidth: '100%',
                aspectRatio: width / height,
            }}
            />
        )
}

const components : PortableTextComponents = {
    types: {
        image: ImageComponent,
    },
    list: {
        bullet: ({children}  ) => <ul style={{listStyleType: 'auto'}}>{children}</ul>,
    },
    listItem: {
        bullet: ({children} ) => <li style={{marginBottom: 10}}>{children}</li>,
      },
}

const RichTextComponent =({value}: ComponentProps) => {
    return <PortableText value={value} components={components}  />
  }

export default RichTextComponent;