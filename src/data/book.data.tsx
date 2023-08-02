
import Book  from '../interfaces/bookInterface';


export const bookData: Book = {
    _id: '1',
    title: 'Book Title',
    body: 'Book Body',
    url: 'https://www.google.com',
    publishedAt: new Date(),
    author: {
        name: 'Author Name',
        image: {
            asset: {
                _id: '1',
                url: 'https://via.placeholder.com/150'
            }
        }
    },
    category: {
        title: 'Category Title',
        slug: {
            current: 'category-slug'
        }
    },
    slug: {
        current: 'book-slug'
    },
    mainImage: {
        asset: {
            _id: '1',
            url: 'https://via.placeholder.com/150'
        }
    }
}