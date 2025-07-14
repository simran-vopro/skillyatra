import { useMemo } from "react";
import { useAxios } from "./useAxios";
import { API_PATHS } from "../utils/config";
import type { Course } from "../types/course";



export interface PaginationModel {
  page?: number;
  pageSize?: number;
}

interface UseCourseListProps {
  searchQuery?: string;
  paginationModel?: PaginationModel;
  urlPath?: string;
}

export const useCourseList = ({ searchQuery = "", paginationModel = {}, urlPath }: UseCourseListProps = {}) => {
  const { page, pageSize } = paginationModel;

  const query = useMemo(() => {
    const params: Record<string, string> = {};

    if (searchQuery) params.search = searchQuery;
    if (page !== undefined) params.page = (page + 1).toString(); // 1-based index
    if (pageSize !== undefined) params.limit = pageSize.toString();

    return new URLSearchParams(params).toString();
  }, [searchQuery, page, pageSize]);

  const { data, metaData, loading, error, refetch } = useAxios<Course[]>({
   url: `${urlPath ? urlPath : API_PATHS.COURSES}?${query}`,
  });

  return {
    courseData: data || [],
    metaData,
    loading,
    error,
    refetch,
  };
};
