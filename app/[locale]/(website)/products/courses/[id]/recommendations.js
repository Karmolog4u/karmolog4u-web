export const getRecommendedWebinars = (webinars, currentWebinar) => {
  if (!currentWebinar) return [];

  return webinars.filter(
    webinar =>
      webinar.category === currentWebinar.category && webinar.id !== currentWebinar.id
  );
};
