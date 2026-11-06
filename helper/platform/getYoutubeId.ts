export const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.endsWith('youtu.be')) {
      return parsedUrl.pathname.slice(1) || null;
    }

    return (
      parsedUrl.searchParams.get('v') ||
      parsedUrl.pathname.match(/\/(?:embed|shorts|v)\/([\w-]+)/)?.[1] ||
      null
    );
  } catch {
    return null;
  }
};
