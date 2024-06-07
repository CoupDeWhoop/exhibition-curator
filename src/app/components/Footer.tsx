import Link from "next/link";

type Props = {
  topic: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
  museum: string | null;
};

export default function Footer({
  topic,
  page,
  prevPage,
  nextPage,
  museum,
}: Props) {
  if (!prevPage && !nextPage) return null;

  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }

  const basePath = museum ? `/${museum}/results` : `/chicago/results`;
  const fullPath = topic ? `${basePath}/${topic}` : `${basePath}/artworks`;

  const nextPageArea = nextPage ? (
    <Link
      href={`${fullPath}/${nextPage}`}
      className={!prevPage ? "mx-auto" : ""}
    >
      {!prevPage ? "more" : null} &gt;&gt;&gt;
    </Link>
  ) : null;

  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`${fullPath}/${prevPage}`}
        className={!nextPage ? "mx-auto" : ""}
      >
        {!nextPage ? "back" : null} &lt;&lt;&lt;
      </Link>
      {pageNums.map((num, index) =>
        page && num === parseInt(page) ? (
          <span key={index}>{num}</span>
        ) : (
          <Link
            key={index}
            href={`${fullPath}/${num}`}
            className="underline underline-offset-[6px]"
          >
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
