import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  generateEmailVerificationCode,
  sendVerificationCode,
} from "@/lib/utils";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { emailVerification } from "./actions";

export default async function Verification() {
  const { user } = await validateRequest();

  if (user && user.emailVerified) {
    redirect("/");
  } else {
    const code = await generateEmailVerificationCode(user.id, user.email);

    await sendVerificationCode(user.email, code);
  }

  return (
    <div>
      <form action={emailVerification}>
        <InputOTP maxLength={8}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
}
