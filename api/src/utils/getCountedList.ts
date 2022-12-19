import { PrismaService } from 'src/prisma/prisma.service';
import { Field, ObjectType } from '@nestjs/graphql';

export type CountedListType<T> = {
  total: number;
  items: T;
};

@ObjectType({ description: 'The main data about the links' })
export class CountedList {
  @Field(() => Number, { nullable: true })
  total?: number;
}

export async function getCountedList<T, S = T>(
  prisma: PrismaService,
  entity: string,
  query,
  mutation?: (item: T) => S,
): Promise<CountedListType<S>> {
  const results = await prisma.$transaction([
    prisma[entity].findMany({
      ...query,
      cursor: undefined,
      skip: undefined,
      take: undefined,
    }),
    prisma[entity].findMany(query),
  ]);

  if (mutation) {
    return {
      total: results[0].length,
      items: mutation(results[1]),
    };
  }

  return {
    total: results[0].length,
    items: results[1],
  };
}
