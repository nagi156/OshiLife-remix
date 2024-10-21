import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useId } from "react";
import { sidbarSchema } from "./conponents/sidbar";

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const submission = parseWithZod(fd, { schema: sidbarSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }
};

export const Sidber = () => {
  const id = useId();
  return (
    <>
      <h1>新規投稿</h1>
      <Form method="post">
        <label htmlFor={id + "titile"}>タイトル</label>
        <input
          id={id + "title"}
          type="text"
          name="title"
          className="block border-2 border-gray-400 rounded w-full"
        />
        <label htmlFor={id + "content"}>投稿内容</label>
        <textarea
          name="content"
          id={id + "content"}
          rows={5}
          className="block border-2 border-gray-400 rounded w-full"
        ></textarea>
      </Form>
    </>
  );
};
