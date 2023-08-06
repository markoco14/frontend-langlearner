import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  
  return (
    <>
      <main>
				<div className="max-w-[600px] mx-auto mt-24">
					{children}
				</div>
			</main>
    </>
  )
}