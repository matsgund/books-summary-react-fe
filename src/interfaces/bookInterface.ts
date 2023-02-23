 // create an interface for book
 interface Book {
    _id: string;
    title: string;
    body: any;
    publishedAt: Date;
    author : {
        name: string;
        image : {
            asset: {
                _id: string;
                url: string;
            }
        }
    };
    category: {
        title: string;
        slug: {
            current: string;
        }
    };
    slug: {
        current: string;
    };
    mainImage: {
        asset: {
            _id: string;
            url: string;
            }        
        }
    }

export default Book;