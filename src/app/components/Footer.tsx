import Link from "next/link";

type Props = {
  topic: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
};

export default function Footer({ topic, page, prevPage, nextPage }: Props) {
  if (!prevPage && !nextPage) return;

  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }

  const basePath = topic ? `/results/${topic}` : `/results/artworks`;

  const nextPageArea = nextPage ? (
    <Link
      href={`${basePath}/${nextPage}`}
      className={!prevPage ? "mx-auto" : ""}
    >
      {!prevPage ? "more" : null} &gt;&gt;&gt;{" "}
    </Link>
  ) : null;

  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`${basePath}/${prevPage}`}
        className={!nextPage ? "mx-auto" : ""}
      >
        {!nextPage ? "back" : null} &lt;&lt;&lt;
      </Link>
      {pageNums.map((num, i) =>
        page && num === parseInt(page) ? (
          <span key={i}>{num}</span>
        ) : (
          <Link href={`${basePath}/${num}`} className="underline">
            {num}
          </Link>
        )
      )}
    </>
  ) : null;

  return (
    <footer className="flex flex-row justify-between px-2 py-4 font-bold w-60 mx-auto">
      {prevPageArea}
      {nextPageArea}
    </footer>
  );
}
