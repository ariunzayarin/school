import { Image as ExpoImage } from "expo-image";

export default function Image({
  url,
  width,
  height,
  full = false,
  aspectRatio,
  contentFit = "cover",
  borderRadius = 0,
  rounded = false,
  placeholder,
  transition = 300,
  onLoad,
  onError,
  style,
}) {
  const resolvedPlaceholder =
    placeholder === false ? undefined : { blurhash: placeholder };

  const imageStyle = [
    full && { width: "100%" },
    width != null && { width },
    height != null && { height },
    aspectRatio != null && { aspectRatio },
    { borderRadius: rounded ? 9999 : borderRadius },
    style,
  ];

  return (
    <ExpoImage
      source={url}
      style={imageStyle}
      contentFit={contentFit}
      placeholder={resolvedPlaceholder}
      placeholderContentFit={contentFit}
      transition={transition}
      onLoad={onLoad}
      onError={onError}
    />
  );
}
