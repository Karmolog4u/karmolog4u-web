type YoutubeUrlResult = { video: string; playlist: string };

export const getYoutubeUrlData = (url: string): YoutubeUrlResult => {
  try {
    const parsedUrl = new URL(url);

    const playlist = parsedUrl.searchParams.get('list') || '';
    const video =
      parsedUrl.searchParams.get('v') ||
      parsedUrl.pathname.match(/\/(?:embed|shorts|v)\/([\w-]+)/)?.[1] ||
      (parsedUrl.hostname.endsWith('youtu.be')
        ? parsedUrl.pathname.split('/').filter(Boolean)[0]
        : '') ||
      '';

    return { video, playlist };
  } catch {
    return { video: '', playlist: '' };
  }
};

export const getYoutubeVideoId = (url: string): string | null =>
  getYoutubeUrlData(url).video || null;
