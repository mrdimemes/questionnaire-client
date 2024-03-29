import { useState, useEffect } from "react";

import { SortOption, Tag } from "src/models";
import { useTagsDataSelector } from "src/redux/hooks";
import { PaginationBar, Loadable } from "src/components";
import { useUserAdminFlagSelector } from "src/redux/hooks";

import { TagGalleryItem, AddTagWidget, SettingsBar } from "./subcomponents";
import { getCompareFunction, searchFilter } from "./helpers";
import styles from "./TagGallery.module.sass";

import type { TagGalleryProps } from "./types";


const TagGallery = ({ pageSize, resetScroll }: TagGalleryProps) => {
  const [tags, status] = useTagsDataSelector();
  const [filteredTags, setFilteredTags] = useState([] as Tag[]);
  const [sortOption, setSortOption] = useState(SortOption.NoSort);
  const [searchPhrase, setSearchPhrase] = useState("");
  const tagsPerPage = pageSize ?? 20;
  const totalPages = Math.ceil(filteredTags.length / tagsPerPage);
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * tagsPerPage;
  const isUserAdmin = useUserAdminFlagSelector();

  const changeActivePage = (page: number) => {
    setActivePage(page > totalPages ? totalPages : page);
  };

  useEffect(() => {
    if (resetScroll) resetScroll();
  }, [activePage, resetScroll]);

  useEffect(() => {
    setFilteredTags(
      tags
        .filter((tag: Tag) => searchFilter(tag, searchPhrase))
        .sort(getCompareFunction(sortOption)),
    );
    setActivePage(1);
  }, [sortOption, searchPhrase, tags]);

  return (
    <Loadable loadingStatus={status}>
      <div className={styles.TagGallery}>

        <SettingsBar
          className={styles.settings}
          sortOption={sortOption}
          setSortOption={setSortOption}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />

        {
          filteredTags.length === 0 &&
          <p className={styles.prompt}>По запросу ничего не найдено.</p>
        }

        {
          isUserAdmin &&
          <AddTagWidget className={styles.addTagWidget} />
        }

        <div className={styles.tags}>
          {
            filteredTags
              .slice(startIndex, startIndex + tagsPerPage)
              .map((tag) => {
                return <TagGalleryItem key={tag.id} tag={tag} />;
              })
          }
        </div>

        <PaginationBar
          className={styles.pagination}
          activePage={activePage}
          totalPages={totalPages}
          callback={changeActivePage}
        />

      </div>
    </Loadable>
  );
};

export default TagGallery;