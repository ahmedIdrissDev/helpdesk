import { SignUp } from "@clerk/nextjs";
import { simple } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <SignUp
        appearance={{
          baseTheme: simple,
          variables: {
            colorPrimary: "#7e1212",
            borderRadius: "0.75rem",
          },
          elements: {
            card: "shadow-none border border-hairline",
            formButtonPrimary: "shadow-none hover:bg-primary-deep transition-all",
          },
        }}
      />
    </div>
  );
}
