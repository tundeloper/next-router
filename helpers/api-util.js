export const getAllEvents = async () => {
  const response = await fetch(
    "https://next--routing-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvent = await getAllEvents();
  return allEvent.filter((event) => event.isFeatured);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allEvent = await getAllEvents();

  let filteredEvents = allEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getEventById = async (id) => {
  const allEvent = await getAllEvents();
  return allEvent.find((event) => event.id === id);
};
