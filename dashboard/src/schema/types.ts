export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** The main data about the links */
export type Link = {
  __typename?: 'Link';
  id?: Maybe<Scalars['ID']>;
  /** The id of the link is a random or custom string that should define short id */
  hash: Scalars['String'];
  /** The path of the link is the url of the link */
  path: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getLinks?: Maybe<Array<Link>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink?: Maybe<Link>;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
};

export type MutationCreateLinkArgs = {
  path: Scalars['String'];
};

export type MutationUpdateLinkArgs = {
  id: Scalars['Float'];
  path: Scalars['String'];
};

export type MutationDeleteLinkArgs = {
  id: Scalars['Float'];
};
