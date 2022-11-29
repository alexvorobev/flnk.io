/* eslint-disable unicorn/prevent-abbreviations */
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

/** User data entity */
export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  /** User's name */
  name: Scalars['String'];
  /** User's surname */
  surname: Scalars['String'];
  /** User's email */
  email: Scalars['String'];
  /** User role */
  role: Scalars['String'];
  /** Is user blocked flag */
  isBlocked: Scalars['Boolean'];
};

/** The main data about the links */
export type Link = {
  __typename?: 'Link';
  id?: Maybe<Scalars['ID']>;
  /** The id of the link is a random or custom string that should define short id */
  hash: Scalars['String'];
  /** The path of the link is the url of the link */
  path: Scalars['String'];
  /** Link creator data */
  user?: Maybe<User>;
  /** The link is active or not */
  isActive?: Maybe<Scalars['Boolean']>;
  /** The link is blocked or not */
  isBlocked?: Maybe<Scalars['Boolean']>;
};

/** User access response */
export type AuthToken = {
  __typename?: 'AuthToken';
  /** User's auth token */
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getLinks?: Maybe<Array<Link>>;
  auth?: Maybe<AuthToken>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
};

export type QueryAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink?: Maybe<Link>;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
  signUp?: Maybe<AuthToken>;
  updateUser?: Maybe<User>;
};

export type MutationCreateLinkArgs = {
  path: Scalars['String'];
  hash: Scalars['String'];
};

export type MutationUpdateLinkArgs = {
  updateLinkInput: UpdateLinkInput;
};

export type MutationDeleteLinkArgs = {
  id: Scalars['Float'];
};

export type MutationSignUpArgs = {
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type UpdateLinkInput = {
  id?: Maybe<Scalars['ID']>;
  hash?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
};
