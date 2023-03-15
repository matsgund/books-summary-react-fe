import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import client from '@/utils/sanityClient';
import  { ReactNode } from 'react';

interface ComponentProps {
    value: any;
    isInline: boolean;
}

interface ImageDimensions {
    width: number;
    height: number;
}

interface Components {
    types: {
        image: (props: ComponentProps) => JSX.Element;
    };
    list: {
        bullet: (props: { children: ReactNode }) => JSX.Element;
    };
    listItem: {
        bullet: (props: { children: ReactNode }) => JSX.Element;
    };
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

const components = {
    types: {
        image: ImageComponent,
    },
    list: {
        bullet: ({children} : { children: ReactNode } ) => <ul style={{listStyleType: 'auto'}}>{children}</ul>,
    },
    listItem: {
        bullet: ({children} : { children: ReactNode }) => <li style={{marginBottom: 10}}>{children}</li>,
      },
}

const RichTextComponent =({value}: ComponentProps) => {
    return <PortableText value={value} components={components}  />
  }

export default RichTextComponent;