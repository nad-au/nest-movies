import { Node, Integer, Record } from 'neo4j-driver-core';

export function nodeProps<Properties>(record: Record, key: string): Properties {
  const node: Node<Integer, Properties> = record.get(key);
  return node.properties;
}

export function nodeArrayProps<Properties>(
  record: Record,
  key: string,
): Properties[] {
  const node: Node<Integer, Properties>[] = record.get(key);
  return node.map((node) => node.properties);
}
