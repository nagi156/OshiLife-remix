import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useId } from "react";
import { sidbarSchema } from "./conponents/sidbar";
import { z } from "zod";

const schema = z.object({
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .trim()
    .min(1, "1文字以上で入力してください")
    .max(50),
  content: z
    .string({ required_error: "投稿内容を入力してください" })
    .trim()
    .min(5, "5文字以上で入力してください")
    .max(140),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const submission = parseWithZod(fd, { schema: sidbarSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }
};

export const Sidber = () => {
  const [form, field] = useForm({
    constraint: getZodConstraint(schema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const id = useId();
  return (
    <>
      <h1>新規投稿</h1>
      <Form method="post" {...getFormProps(form)}>
        <div>
          <label htmlFor={id + "titile"}>タイトル</label>
          <input
            {...getInputProps(field.title, { type: "text" })}
            className={`input-text
            ${
              field.title.errors
                ? "border-pink-700 bg-pink-200"
                : "border-gray-400"
            }`}
          />
          <div className="error-message">{field.title.errors}</div>
        </div>
        <div>
          <label htmlFor={id + "content"}>投稿内容</label>
          <textarea
            {...getTextareaProps(field.content)}
            rows={5}
            className={`input-text
            ${
              field.content.errors
                ? "border-pink-700 bg-pink-200"
                : "border-gray-400"
            }`}
          ></textarea>
          <div className="error-message">{field.content.errors}</div>
        </div>
        <button className="">投稿</button>
      </Form>
    </>
  );
};
