import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import client from '@/utils/sanityClient';

interface ImageComponentProps {
    value: any;
    isInline: boolean;
}

interface ImageDimensions {
    width: number;
    height: number;
}

const ImageComponent = ({value, isInline} : ImageComponentProps) => {
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
    
const components = {
    types: {
        image: ImageComponent,
    },
}

const RichTextComponent =({value}: ImageComponentProps) => {
    return <PortableText value={value} components={components} />
  }

export default RichTextComponent;