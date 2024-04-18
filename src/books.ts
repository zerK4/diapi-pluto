import axios from "axios";

interface ApiResponse {
  // Define the structure of your API responses here
  // This is a generic interface, you can add specific properties for each endpoint
  content: any;
  message: string;
  [key: string]: any;
}

class Diapi {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key required for initialization");
    }
    this.apiKey = apiKey;
    this.baseUrl = "http://localhost:3002/api/v1";
  }

  private async _makeRequest<T extends ApiResponse>({
    method,
    url,
    data,
    query,
    id,
  }: {
    method: "get" | "post" | "put" | "delete";
    url: string;
    data?: any;
    query?: {
      key: string;
      value: string;
    };
    id?: string;
  }): Promise<T> {
    const headers = { Authorization: `Bearer ${this.apiKey}` };

    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}/${url}/${this.apiKey}/${
          id
            ? id
            : `all${query?.key ? `?key=${query.key}&value=${query.value}` : ""}`
        }`,
        data,
        headers,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  /**
   * Get all books
   *
   * Used to get all the content within the book with the given api key.
   *
   * Returns an object
   *
   * {
   *   content: it can be an array, an object, or whatever you inserted on the database,
   *   message: string
   * }
   */
  async getAll(): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "get",
      url: "books",
    });
    return {
      content,
      message,
    };
  }

  /**
   * Query on all book content
   *
   * Gets a key and a value as strings.
   *
   * Filters all the entries from the array you entered on the database and returns the filtered array.
   */
  async queryIt({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "get",
      url: "books",
      query: {
        key,
        value,
      },
    });
    return {
      content,
      message,
    };
  }

  /**
   * Get one element from the array you entered on the database.
   *
   * Filters the array and returns the provided ID.
   */
  async getOne({ id }: { id: string }): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "get",
      url: "books",
      id,
    });
    return {
      content,
      message,
    };
  }

  /**
   * Update one by id
   *
   * Updates one element based on the ID provided and the key and value.
   */
  async updateOne({
    id,
    data,
  }: {
    id: string;
    data: {
      key: string;
      value: any;
    };
  }): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "put",
      url: "books",
      id,
      data,
    });

    return {
      content,
      message,
    };
  }

  /**
   * Add new element in array.
   *
   * Adds a new element in the array you entered on the database.
   *
   * You can push one object or an array of objects.
   *
   * It will return the added element/s.
   */
  async addNew({ data }: { data: any }): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "post",
      url: "books",
      data: {
        clear: false,
        data,
      },
    });

    return {
      content,
      message,
    };
  }

  /**
   * Add and replace.
   *
   * I replaces the array you entered on the database with whatever you provide now.
   */
  async addAndReplace({ data }: { data: any }): Promise<ApiResponse> {
    const { content, message } = await this._makeRequest({
      method: "post",
      url: "books",
      data: {
        clear: true,
        data,
      },
    });

    return {
      content,
      message,
    };
  }

  async removeOne({ id }: { id: string }) {
    const { content, message } = await this._makeRequest({
      method: "delete",
      url: "books",
      id,
    });

    return {
      content,
      message,
    };
  }
}

export default Diapi;
