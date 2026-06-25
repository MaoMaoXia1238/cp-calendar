export interface ScrapedContest {
  platform: string;
  contestId: string;
  name: string;
  url: string;
  startTime: Date;
  endTime: Date;
  duration: number;
}
