export class SupabaseCredetialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseCredentialsError";
  }
}

export class RateLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitExceededError";
  }
}

export class SupabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseError";
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}