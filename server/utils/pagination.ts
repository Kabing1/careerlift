export interface PaginationArgs {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function encodeCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

export function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString('ascii');
}

export async function createConnection<T extends { id: string }>(
  nodes: T[],
  totalCount: number,
  args: PaginationArgs
): Promise<Connection<T>> {
  const edges = nodes.map((node) => ({
    cursor: encodeCursor(node.id),
    node,
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage: false, // Implement based on your needs
      hasPreviousPage: false, // Implement based on your needs
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
    },
    totalCount,
  };
}