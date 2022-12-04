/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

/** User data entity */
export type User = {
  __typename?: "User"
  id?: Maybe<Scalars["ID"]>
  /** User's name */
  name: Scalars["String"]
  /** User's surname */
  surname: Scalars["String"]
  /** User's email */
  email: Scalars["String"]
  /** User role */
  role: Scalars["String"]
  /** Is user blocked flag */
  isBlocked: Scalars["Boolean"]
}

/** User actions log data */
export type UserLog = {
  __typename?: "UserLog"
  id?: Maybe<Scalars["ID"]>
  /** Action author */
  author: User
  /** Action type */
  action: Scalars["String"]
  /** Action entity */
  entity: Scalars["String"]
  /** Action entity data */
  entityData: Scalars["String"]
  /** Action created at */
  createdAt: Scalars["DateTime"]
}

/** The main data about the links */
export type Link = {
  __typename?: "Link"
  id?: Maybe<Scalars["ID"]>
  /** The id of the link is a random or custom string that should define short id */
  hash: Scalars["String"]
  /** The path of the link is the url of the link */
  path: Scalars["String"]
  /** Link creator data */
  user?: Maybe<User>
  /** The link is active or not */
  isActive?: Maybe<Scalars["Boolean"]>
  /** The link is blocked or not */
  isBlocked?: Maybe<Scalars["Boolean"]>
}

/** Counted list of the links */
export type CountedLinks = {
  __typename?: "CountedLinks"
  total?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Link>>
}

/** User access response */
export type AuthToken = {
  __typename?: "AuthToken"
  /** User's auth token */
  token: Scalars["String"]
}

/** Users counted list */
export type CountedUsers = {
  __typename?: "CountedUsers"
  total?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<User>>
}

/** User actions log data */
export type CountedUsersLog = {
  __typename?: "CountedUsersLog"
  total?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<UserLog>>
}

export type Query = {
  __typename?: "Query"
  getLinks?: Maybe<CountedLinks>
  auth?: Maybe<AuthToken>
  getUsers?: Maybe<CountedUsers>
  me?: Maybe<User>
  getLogs?: Maybe<CountedUsersLog>
}

export type QueryGetLinksArgs = {
  search?: Maybe<Scalars["String"]>
  cursor?: Maybe<Scalars["String"]>
}

export type QueryAuthArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type QueryGetUsersArgs = {
  cursor?: Maybe<Scalars["String"]>
}

export type QueryGetLogsArgs = {
  users?: Maybe<Array<Scalars["String"]>>
  actions?: Maybe<Array<Scalars["String"]>>
  entities?: Maybe<Array<Scalars["String"]>>
  dates?: Maybe<Array<Scalars["String"]>>
  body?: Maybe<Scalars["String"]>
  cursor?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createLink?: Maybe<Link>
  updateLink?: Maybe<Link>
  deleteLink?: Maybe<Link>
  signUp?: Maybe<AuthToken>
  updateUser?: Maybe<User>
}

export type MutationCreateLinkArgs = {
  path: Scalars["String"]
  hash: Scalars["String"]
}

export type MutationUpdateLinkArgs = {
  updateLinkInput: UpdateLinkInput
}

export type MutationDeleteLinkArgs = {
  id: Scalars["Float"]
}

export type MutationSignUpArgs = {
  name: Scalars["String"]
  surname: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type UpdateLinkInput = {
  id?: Maybe<Scalars["ID"]>
  hash?: Maybe<Scalars["String"]>
  path?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isBlocked?: Maybe<Scalars["Boolean"]>
}

export type UpdateUserInput = {
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  surname?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  newPassword?: Maybe<Scalars["String"]>
  role?: Maybe<Scalars["String"]>
  isBlocked?: Maybe<Scalars["Boolean"]>
}
