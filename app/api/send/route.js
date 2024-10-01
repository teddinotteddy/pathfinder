import { CodeTemplate } from "@/email/code";
import { Resend } from "resend";

const resend = new Resend("re_EDSzvD2E_B8y9YuAcB7LAh1ync8PaSya5");

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Pathfinder <verification@tajhans.com>",
      to: [email],
      subject: "Pathfinder Account Verification",
      react: CodeTemplate({ code: code }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (e) {
    console.log(e);

    return Response.json({ error }, { status: 500 });
  }
}
