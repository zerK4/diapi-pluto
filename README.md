# Diapio

Diapio is a simple and easy-to-use library to help you get around Diapi's api's.

## Installation

```bash
bun install diapio
```

## Usage

```typescript
  import {Diapi} from 'diapio';

  const diapi = new Diapi(<your api key from Diapi website>)

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

```typescript
const { content, message } = await diapi.removeOne({
  id: "e76ac813-33df-4ee8-9b02-16019863b224",
});
```
