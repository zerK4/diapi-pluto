# Diapio

Diapio is a simple and easy-to-use library to help you get around Diapi's api's.

## Installation

```bash
bun install diapio
```

## Usage

Create a type and pass it to the Diapi constructor.

Get your API key from the Diapi website and the base url of the instance you are using.

```typescript
  import {Diapi} from 'diapio';

  type Api = {
    avatar: string;
    birthday: string;
    email: string;
    firstName: string;
    id: number;
    index: string;
    lastName: string;
    sex: string;
    subscriptionTier: string;
  }

  const diapi = new Diapi<Api>(<your api key from Diapi website>, <the base url of instance you are using, also from diapi website or your localhost if you are selfhosting>)

  // ex: const diapi = new Diapi<Api>(
  // "diapi-d9cd4bfb-da10-4595-8106-46f89f4e1e39-8oFZpMQe5CzJLmVHDsdw19",
  // "http://localhost:3002/api/v1",
  )

  const {content, message} = diapi.getAll()
```

## What can it do?

- Get all data from your book:

```typescript
const { content, message } = diapi.getAll();
```

- Query data from your book:

```typescript
const { content, message } = diapi.queryIt({
  key: "name",
  value: "John big boy",
});
```

- Get one by id

```typescript
const { content, message } = diapi.getOne({
  id: urId,
});
```

- Update one by id:

```typescript
const { content, message } = await diapi.updateOne({
  id: "",
  data: {
    key: "name",
    value: "new name",
  },
});
```

- Add a new entry:

```typescript
const { content, message } = await diapi.addNew({
  data: [{}] || {}, // You can add an array of objects and it will add them all spreaded into your current data or only one object.
});
```

- Add and replace
  > Whatever you push with this method will replace the current data in your book.

```typescript
const { content, message } = await diapi.addAndReplace({
  data: {
    title: "Test",
  },
});
```

- Delete one by id:

> Deleting by id is simplified so you can delete by any key you want.
> This will delete all the occurences of the key-value pair you are looking for.

````typescript

```typescript
const { content, message } = await diapi.removeOne({
  id: "name=John",
});

const { content, message } = await diapi.removeOne({
  id: "id=alsdja78dsaidajsndakd",
});
````
