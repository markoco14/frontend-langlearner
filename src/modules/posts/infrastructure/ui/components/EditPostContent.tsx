import { PostContent } from "@/modules/posts/domain/entities/PostContent";
import { postContentAdapter } from "@/modules/posts/infrastructure/adapters/postContentAdapter";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { contentAudioAdapter } from "../../adapters/contentAudioAdapter";

type Inputs = {
  content: string;
};

export default function EditPostContent({postContent, setPostContent}: {postContent: PostContent, setPostContent: Function}) {
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
		if (postContent) {
			await postContentAdapter.updatePostContent({postContentId: postContent.id, content: data.content})
			.then((res) => {
				toast.success('Post content editted :)');
				if (typeof res.content !== 'string') {
					const result = res.content.map((subArray: string[]) => subArray.join('')).join('\n\n');
					res.content = result
				}
				setPostContent(res)
			});
		}
	};

	const handleCreateAudio = async ({contentId, contentText}: {contentId: number, contentText: string}) => {
		await contentAudioAdapter.createAudio({contentId: contentId, contentText: contentText})
		.then((res) => {
			if (res.detail) {
				toast.error(res.detail)
				return
			}
			toast.success(`making audio for post content: ${postContent.id}`)
		})
		return
	}

	return (
		<section className="max-w-[70ch] mx-auto mt-12">
			<h2>Post Content</h2>
			<button onClick={() => 
				handleCreateAudio({contentId: postContent.id, contentText: postContent.content.toString()})
				}>Make Audio</button>
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2 mb-2">
					<label>Edit</label>
					<TextareaAutosize
						autoFocus
						minRows={2}
						defaultValue={postContent.content.toString()}
						style={{padding: '8px'}}
						{...register("content")}
					/>
				</div>
				<button className="underline underline-offset-2 decoration-blue-500 decoration-2">
					Edit
				</button>
			</form>
		</section>
	);
}