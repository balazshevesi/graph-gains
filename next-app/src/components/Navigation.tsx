import { Button } from "@/components/ui/button";

import { Card } from "./ui/card";
import { currentUser } from "@clerk/nextjs";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default async function Navigation() {
  const user = await currentUser();

  // if (!user) return <div>Not logged in</div>;
  return (
    <Card className="flex rounded-none p-2">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div>GraphGains</div>
        <div>{!!user && <UserButton />}</div>
      </nav>
    </Card>
  );
}
