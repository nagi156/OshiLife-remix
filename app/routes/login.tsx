import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { createUser, findUserByEmail, prisma } from "~/.server/user";

const schema = z.object({
  name: z.string({ required_error: "名前を入力してください" }).min(1),
  email: z.string({ required_error: "email入れて" }).trim(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const submission = parseWithZod(fd, { schema });
  if (submission.status !== "success") {
    return json(submission.reply);
  }

  const data = submission.value;
  //ここに作成のメソッド入れるprismaのメソッド
  if (await findUserByEmail(prisma, { email: data.email })) {
    console.log("email重複やで");
    return { message: "このメールアドレスは既に使われています。" };
  }
  await createUser(prisma, { name: data.name, email: data.email });
  return redirect("/");
};

export default function Login() {
  const [form, { name, email }] = useForm({
    constraint: getZodConstraint(schema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const actionData = useActionData<typeof action>() as { message?: string };

  return (
    <>
      <Form method="post" {...getFormProps(form)} className="w-full">
        <div className="mt-40 mx-40 justify-center">
          <h1 className="text-3xl">ユーザー登録</h1>
          <div className="mx-auto">
            <label
              htmlFor={name.id}
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Name
            </label>
            <input
              {...getInputProps(name, { type: "text" })}
              className={`input-text
              ${
                name.errors ? "border-pink-700 bg-pink-200" : "border-gray-400"
              }`}
            />
            <div id={name.errorId}>{name.errors}</div>
          </div>

          <div className="mx-auto">
            <label
              htmlFor={email.id}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              {...getInputProps(email, { type: "email" })}
              className={`input-text
              ${
                email.errors ? "border-pink-700 bg-pink-200" : "border-gray-400"
              }`}
            />
            <div id={email.errorId}>{email.errors}</div>
            {actionData?.message && (
              <div className="text-pink-700">{actionData.message}</div>
            )}
          </div>
          <button className="mt-10">送信</button>
          <div className="text-end w-3/6">
            <Link to="/">Top画面へ</Link>
          </div>
        </div>
      </Form>
    </>
  );
}
