



export function validatePass(password: string): string | null {
  console.log(`Validating password: ${password}`);
  if (password.length < 6) {
    console.log("Password length check failed");
    return "Password must be at least 6 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    console.log("Uppercase letter check failed");
    return "Password must include at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    console.log("Lowercase letter check failed");
    return "Password must include at least one lowercase letter.";
  }

  console.log("Password is valid");
  return null;
}
export function errMsg(err: unknown): err is { message: string } {
  return typeof err === "object" && err !== null && "message" in err;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}
