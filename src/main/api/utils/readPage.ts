const regexp = /Page "(?<name>[a-zA-Z0-9\s-]*)"\s*(?<options>[a-zA-Z\s]*)/;

type PageResult = {
  name: string;
  options: string[],
}

export const readPage = (line: string): PageResult | null => {
  if (line.match(regexp)) {
    const { groups } = regexp.exec(line);
    const result: PageResult = {
      name: groups.name,
      options: groups.options.split(/\s+/),
    };
    return result;
  }
  return null;
};