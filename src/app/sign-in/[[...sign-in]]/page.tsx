import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-science-gothic text-4xl">Sign In</h1>
      <SignIn />
    </div>
  );
}
