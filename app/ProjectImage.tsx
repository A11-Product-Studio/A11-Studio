interface Props {
  image: string;
  title: string;
  aspectW: number;
  aspectH: number;
}

export default function ProjectImage({ image, title, aspectW, aspectH }: Props) {
  return (
    <div
      data-cursor="View project"
      style={{
        width: "100%",
        aspectRatio: `${aspectW} / ${aspectH}`,
        position: "relative",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          display: "block",
        }}
      />
    </div>
  );
}
