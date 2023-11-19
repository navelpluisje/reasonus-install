const regexp = /"(?<name>[a-zA-Z0-9\s]*)"\s*(?<nbChannels>[0-9]{1,2})\s*(?<offset>[0-9]{1,2})\s*"(?<surface>[a-zA-Z0-9]*\.mst)"\s*"(?<zones>[a-zA-Z0-9\s-]*)"\s*"(?<effects>[a-zA-Z0-9\s-]*)"\s*/;

type Assignment = {
  name: string,
  nbChannels: string,
  offset: string,
  surface: string,
  zones: string,
  effects: string
}

export const readAssignment = (line: string): Assignment => {
  if (line.match(regexp)) {
    const { groups } = regexp.exec(line);
    return groups as Assignment;
  }
  return null;
};