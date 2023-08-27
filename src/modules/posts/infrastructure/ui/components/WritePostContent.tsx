import { postContentAdapter } from "@/modules/posts/infrastructure/adapters/postContentAdapter";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

type Inputs = {
  content: string;
};

export default function WritePostContent({setPostContent}: {setPostContent: Function}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.content === '') {
			toast('You cannot set the post content as empty. Please include some content');
			return
		}
		
		await postContentAdapter.writePostContent({postId: Number(router.query.post), content: data.content})
    .then((res) => {
      toast.success('Post content saved :)');
			if (typeof res.content !== "string") {
				const result = res.content.map((subArray: string[]) => subArray.join('')).join('\n\n');
				res.content = result
			}
			setPostContent(res)
    });
  };

  return (
		<section className="max-w-[70ch] mx-auto mt-12">
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2 mb-2">
					<label>Write New Post Content</label>
					<TextareaAutosize
						autoFocus
						minRows={2}
						style={{padding: '8px'}}
						{...register("content")}
					/>
				</div>
				<button className="underline underline-offset-2 decoration-blue-500 decoration-2">
					Save
				</button>
			</form>
		</section>
  );
}
