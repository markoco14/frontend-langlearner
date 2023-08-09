import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  
  return (
    <>
      <header>
        <nav className="max-w-[600px] mx-auto">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      <main>
				<div className="max-w-[600px] mx-auto mt-24">
					{children}
				</div>
			</main>
    </>
  )
}