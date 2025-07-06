
# PirateLib

A minimal library management system using React, Redux Toolkit Query (RTK Query), and TypeScript. The system allows users to view a list of books, perform CRUD operations, borrow books, and view a simple borrow summary.


## Features

- Minimalist UI: Tailwind, DaisyUi and React-Aria
- User Experience : Clean and Simple 
- Responsive
- Cross platform


## API Reference

#### Get all Books

```http
  GET /api/books
```

#### Get Book

```http
  GET /api/books/${id}
```
#### Create Book

```http
  POST /api/books/${id}
```

#### Update Book

```http
  PUT /api/books/${id}
```

#### Delete Book

```http
  DEL /api/books/${id}
```

#### Borrow Book
```http
  POST /api/borrow
  ```

#### Borrow Summary
```http
  GET /api/borrow
```

## Tech Stack

**Client:** React, Redux, TailwindCSS, Typescript

**Server:** Node, Express, MongoDB


## Authors

- [@DexZed](https://github.com/DexZed)


## License

[MIT](https://choosealicense.com/licenses/mit/)

