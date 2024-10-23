import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, redirect } from "@remix-run/react";

const schema = z.object({
  name: z.string({ required_error: "名前を入力してください" }).min(1),
  email: z.string({ required_error: "email入れて" }).trim(),
});

const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const submission = parseWithZod(fd, { schema });
  if (submission.status !== "success") {
    return json(submission.reply);
  }

  const data = submission.value;
  //ここに作成のメソッド入れるprismaのメソッド
  return redirect("/users");
};

export default function NewUser() {
  const [form, { name, email }] = useForm({
    constraint: getZodConstraint(schema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <Form method="post" {...getFormProps}>
        <h1>ユーザー登録</h1>
        <div>
          <label htmlFor={name.id}>Name</label>
          <input {...getInputProps(name, { type: "text" })} />
          <div id={name.errorId}>{name.errors}</div>
        </div>

        <div>
          <label htmlFor={email.id}>Email</label>
          <input {...getInputProps(email, { type: "email" })} />
          <div id={email.errorId}>{email.errors}</div>
        </div>
      </Form>
    </>
  );
}
