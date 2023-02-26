
import Book  from '../interfaces/bookInterface';


export const booksData: Book[] = [

    {
        _id: '1',
        title: 'Book Title',
        body: 'Book Body',
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
    },
    {
        _id: '2',
        title: 'Book Title 2',
        body: 'Book Body 2',
        publishedAt: new Date(),
        author: {
            name: 'Author Name 2',
            image: {
                asset: {
                    _id: '2',
                    url: 'https://via.placeholder.com/150'
                }
            }
        },
        category: {
            title: 'Category Title 2',
            slug: {
                current: 'category-slug-2'
            }
        },
        slug: {
            current: 'book-slug-2'
        },
        mainImage: {
            asset: {
                _id: '2',
                url: 'https://via.placeholder.com/150'
            }
        }
    },
    {
        _id: '3',
        title: 'Book Title 3',
        body: 'Book Body 3',
        publishedAt: new Date(),
        author: {
            name: 'Author Name 3',
            image: {
                asset: {
                    _id: '3',
                    url: 'https://via.placeholder.com/150'
                }
            }
        },
        category: {
            title: 'Category Title 3',
            slug: {
                current: 'category-slug-3'
            }
        },
        slug: {
            current: 'book-slug-3'
        },
        mainImage: {
            asset: {
                _id: '3',
                url: 'https://via.placeholder.com/150'
            }
        }
    }

];