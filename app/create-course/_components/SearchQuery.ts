function searchSubjects(data: any, searchQuery: string) {
  const lowerTerm = searchQuery.toLowerCase();

  return {
    subjects: data?.subjects?.filter((subject: any) => {
      // Check if subject_name matches
      if (subject?.subject_name?.toLowerCase().includes(lowerTerm)) {
        return true;
      }

      // Check if any module_name matches
      return subject.modules?.some((module: any) =>
        module.module_name?.toLowerCase().includes(lowerTerm)
      );
    }),
  };
}

export default searchSubjects;
