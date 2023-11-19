const v1Regexp = /MidiSurface "(?<deviceName>[a-zA-Z0-9\s]*)"\s*(?<portIn>[0-9]{1,2})\s*(?<portOut>[0-9]{1,2})\s*"(?<surface>[a-zA-Z0-9]*\.mst)"\s*"(?<zones>[a-zA-Z0-9\-\s]*)"\s*(?<nbChannels>[0-9]{1,2})\s*[0-9]{1,2}\s*[0-9]{1,2}\s*(?<offset>[0-9]{1,2})/;
const v2Regexp = /MidiSurface "(?<deviceName>[a-zA-Z0-9\s]*)"\s*(?<portIn>[0-9]{1,2})\s*(?<portOut>[0-9]{1,2})/;

export const readSurface = <T extends Record<string, string>>(line: string): T => {
  if (line.match(v1Regexp)) {
    const { groups } = v1Regexp.exec(line);
    return {
      ...groups,
    } as T;
  }
  if (line.match(v2Regexp)) {
    const { groups } = v2Regexp.exec(line);
    return {
      ...groups,
    } as T;
  }
  return null;
};