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

export async function getCountedList<T>(
  prisma: PrismaService,
  entity: string,
  query,
): Promise<CountedListType<T>> {
  const results = await prisma.$transaction([
    prisma[entity].findMany({
      ...query,
      cursor: undefined,
      skip: undefined,
      take: undefined,
    }),
    prisma[entity].findMany(query),
  ]);

  console.log(results[1].length);

  return {
    total: results[0].length,
    items: results[1],
  };
}
