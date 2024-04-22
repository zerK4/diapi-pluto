import axios from "axios";

type ApiResponse<ContentApiResponse> = {
  content: ContentApiResponse;
  message: string;
};

class Diapi<ContentApiResponse> {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  public response: ContentApiResponse | any;

  constructor(apiKey: string, baseUrl: string) {
    if (!apiKey) {
      throw new Error("API key required for initialization");
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.response = undefined;
  }

  private async _makeRequest<ContentApiResponse>({
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
  }) {
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
      console.log(response, "the response");
      return response.data as ApiResponse<ContentApiResponse>;
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
  async getAll(): Promise<ApiResponse<ContentApiResponse[]>> {
    const data = await this._makeRequest<ContentApiResponse[]>({
      method: "get",
      url: "books",
    });

    return data as ApiResponse<ContentApiResponse[]>;
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
  }): Promise<ApiResponse<ContentApiResponse[]>> {
    const data = await this._makeRequest<ContentApiResponse[]>({
      method: "get",
      url: "books",
      query: {
        key,
        value,
      },
    });
    return data as ApiResponse<ContentApiResponse[]>;
  }

  /**
   * Get one element from the array you entered on the database.
   *
   * Filters the array and returns the provided ID.
   */
  async getOne({
    id,
  }: {
    id: string;
  }): Promise<ApiResponse<ContentApiResponse>> {
    const data = await this._makeRequest<ContentApiResponse>({
      method: "get",
      url: "books",
      id,
    });

    console.log(data, "asd");

    return data as ApiResponse<ContentApiResponse>;
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
  }): Promise<ApiResponse<ContentApiResponse>> {
    const response = await this._makeRequest({
      method: "put",
      url: "books",
      id,
      data,
    });

    return response as ApiResponse<ContentApiResponse>;
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
  async addNew({
    data,
  }: {
    data: any;
  }): Promise<ApiResponse<ContentApiResponse>> {
    const response = await this._makeRequest({
      method: "post",
      url: "books",
      data: {
        clear: false,
        data,
      },
    });

    return response as ApiResponse<ContentApiResponse>;
  }

  /**
   * Add and replace.
   *
   * I replaces the array you entered on the database with whatever you provide now.
   */
  async addAndReplace({
    data,
  }: {
    data: any;
  }): Promise<ApiResponse<ContentApiResponse[]>> {
    const response = await this._makeRequest({
      method: "post",
      url: "books",
      data: {
        clear: true,
        data,
      },
    });

    return response as ApiResponse<ContentApiResponse[]>;
  }

  /**
   * Remove one element from the array.
   * ex: Delete element with key "name" and value "John"
   *
   * ** id: "name=John"
   *
   * In this way you can delete one element filtering by any of the element's keys
   */
  async removeOne({ key, value }: { key: string; value: string }) {
    const { message } = await this._makeRequest({
      method: "delete",
      url: "books",
      id: `${key}=${value}`,
    });

    return {
      message,
    };
  }
}

export default Diapi;
