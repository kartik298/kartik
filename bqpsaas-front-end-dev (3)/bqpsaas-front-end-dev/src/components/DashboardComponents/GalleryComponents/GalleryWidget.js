import { GalleryItem } from "./GalleryItem";

export const GalleryWidget = () => {
  return (
    <div className="px-3 py-3 grid grid-flow-row grid-cols-4 gap-y-5">
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
    </div>
  );
};
